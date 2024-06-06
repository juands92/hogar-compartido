import { Component, OnInit } from '@angular/core';
import { Observable, forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  UserBody,
  ProfileResponse,
  HomeResponse,
  HomeUser,
  ExpensesResponse,
  TasksResponse,
} from '../../models/general-types';
import { Store } from '@ngrx/store';
import * as UserSelectors from '../../store/selectors/user.selectors';
import { AppState } from '../../store/state/state';
import { UserService } from '../../services/user.service';
import * as ProfileActions from '../../store/actions/profile.actions';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css'],
  providers: [],
})
export class OverviewComponent implements OnInit {
  user$?: Observable<UserBody>;
  home?: HomeResponse;
  homeUsers: HomeUser[] = [];
  userId: string = '';
  totalDebo: number = 0;
  totalMeDeben: number = 0;
  debts: { user: HomeUser; amount: number }[] = [];
  credits: { user: HomeUser; amount: number }[] = [];
  optimizedTransfers: { from: HomeUser; to: HomeUser; amount: number }[] = [];
  myTasks: TasksResponse[] = [];
  otherTasks: { user: HomeUser; tasks: TasksResponse[] }[] = [];
  taskExpandState: { [key: string]: boolean } = {};

  constructor(
    private _userService: UserService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store.select(UserSelectors.selectUserId).subscribe((id) => {
      this.userId = id;

      if (this.userId) {
        this._userService.getUser(this.userId).subscribe({
          next: (response: ProfileResponse) => {
            this.home = response.home;

            if (this.home?.users) {
              const userObservables = this.home.users.map((user) => {
                if (typeof user === 'string') {
                  return this._userService.getUser(user).pipe(
                    map((userResponse) => ({
                      id: userResponse.id,
                      name: userResponse.name,
                      lastName: userResponse.lastName,
                      profileImage: userResponse.profileImage
                        ? 'data:image/jpeg;base64,' + userResponse.profileImage
                        : 'https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1114445501.jpg',
                      expenses: userResponse.expenses || [],
                      tasks: userResponse.tasks || [],
                    })),
                    catchError(() =>
                      of({
                        id: user,
                        name: '',
                        lastName: '',
                        profileImage: '',
                        expenses: [],
                        tasks: [],
                      } as HomeUser)
                    )
                  );
                } else {
                  return of({
                    id: user.id,
                    name: user.name,
                    lastName: user.lastName,
                    profileImage: user.profileImage
                      ? 'data:image/jpeg;base64,' + user.profileImage
                      : 'https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1114445501.jpg',
                    expenses: user.expenses || [],
                    tasks: user.tasks || [],
                  });
                }
              });

              forkJoin(userObservables).subscribe((userResponses) => {
                this.homeUsers = userResponses as HomeUser[];
                const allExpenses = this.combineExpenses(
                  this.home?.expenses || [],
                  this.homeUsers
                );
                this.calculateExpenses(allExpenses);

                const allTasks = this.combineTasks(
                  this.home?.tasks || [],
                  this.homeUsers
                );
                this.assignTasks(allTasks);

                this.optimizeTransfers();
              });
            }

            this.store.dispatch(
              ProfileActions.update({
                name: response.name,
                lastName: response.lastName,
                email: response.email,
                dateOfBirth: response.dateOfBirth,
                profileImage: response.profileImage,
                home: response.home,
                tasks: response.tasks,
                expenses: response.expenses,
              })
            );
          },
          error: (error) => {
            console.log('Error ' + JSON.stringify(error));
          },
        });
      }
    });
  }

  combineExpenses(
    homeExpenses: (ExpensesResponse | number)[],
    users: HomeUser[]
  ): ExpensesResponse[] {
    const userExpenses: ExpensesResponse[] = users.flatMap(
      (user) => user.expenses || []
    );

    const allExpensesMap = new Map<number, ExpensesResponse>();

    // Add expenses from homeExpenses
    homeExpenses.forEach((expense) => {
      if (typeof expense !== 'number' && expense.id != null) {
        allExpensesMap.set(expense.id, expense);
      }
    });

    // Add user expenses
    userExpenses.forEach((expense) => {
      if (expense.id != null) {
        allExpensesMap.set(expense.id, expense);
      }
    });

    // Ensure all expenses are complete
    homeExpenses.forEach((expense) => {
      if (typeof expense === 'number' && !allExpensesMap.has(expense)) {
        const matchedExpense = userExpenses.find((e) => e.id === expense);
        if (matchedExpense) {
          allExpensesMap.set(expense, matchedExpense);
        }
      }
    });

    return Array.from(allExpensesMap.values());
  }

  combineTasks(homeTasks: TasksResponse[], users: HomeUser[]): TasksResponse[] {
    const userTasks: TasksResponse[] = users.flatMap(
      (user) => user.tasks || []
    );

    const allTasksMap = new Map<number, TasksResponse>();

    // Add tasks from homeTasks
    homeTasks.forEach((task) => {
      if (task.id != null) {
        allTasksMap.set(task.id, task);
      }
    });

    // Add user tasks
    userTasks.forEach((task) => {
      if (task.id != null) {
        allTasksMap.set(task.id, task);
      }
    });

    return Array.from(allTasksMap.values());
  }

  calculateExpenses(allHomeExpenses: ExpensesResponse[] = []): void {
    // Inicializar las variables
    this.totalMeDeben = 0;
    this.totalDebo = 0;
    this.debts = [];
    this.credits = [];

    // Calcular los gastos totales de la casa
    const totalHomeExpenses = allHomeExpenses.reduce(
      (sum, expense) => sum + expense.amount,
      0
    );

    // Calcular la parte equitativa que cada usuario debería pagar
    const numberOfUsers = this.homeUsers.length;
    const equalShare = totalHomeExpenses / numberOfUsers;

    // Crear un mapa de gastos por usuario
    const userExpensesMap = new Map<string, number>();
    allHomeExpenses.forEach((expense) => {
      const userId =
        typeof expense.user === 'string' ? expense.user : expense.user.id;
      if (userId) {
        const currentExpense = userExpensesMap.get(userId) || 0;
        userExpensesMap.set(userId, currentExpense + expense.amount);
      }
    });

    // Inicializar variables para el usuario actual
    let totalOwedToUser = 0;
    let totalOwedByUser = 0;

    // Ajuste para cada usuario
    this.homeUsers.forEach((user) => {
      const otherUserTotalExpenses = userExpensesMap.get(user.id) || 0;

      if (user.id === this.userId) {
        // Si el usuario actual ha pagado más de su parte equitativa
        const userDifference = otherUserTotalExpenses - equalShare;
        if (userDifference > 0) {
          totalOwedToUser = userDifference;
        } else {
          totalOwedByUser = -userDifference;
        }
      } else {
        // Para otros usuarios
        const otherUserDifference = equalShare - otherUserTotalExpenses;
        if (otherUserDifference > 0) {
          this.credits.push({ user, amount: otherUserDifference });
        } else if (otherUserDifference < 0) {
          this.debts.push({ user, amount: -otherUserDifference });
        }
      }
    });

    // Eliminar duplicados y ajustar el totalOwedByUser correctamente
    this.credits = this.credits.filter((credit) => credit.amount > 0);
    this.debts = this.debts.filter((debt) => debt.amount > 0);

    // Ajuste final para las cantidades totales
    this.totalMeDeben = totalOwedToUser;
    this.totalDebo = totalOwedByUser;
  }

  optimizeTransfers(): void {
    // Inicializar listas de deudas y créditos
    const debts = [...this.debts];
    const credits = [...this.credits];

    // Limpiar la lista de transferencias optimizadas
    this.optimizedTransfers = [];

    // Algoritmo para minimizar las transferencias
    while (debts.length > 0 && credits.length > 0) {
      const debt = debts.shift();
      const credit = credits.shift();

      if (debt && credit) {
        const amount = Math.min(debt.amount, credit.amount);

        // Agregar la transferencia a la lista optimizada
        this.optimizedTransfers.push({
          from: debt.user,
          to: credit.user,
          amount: amount,
        });

        // Actualizar las cantidades restantes de deuda y crédito
        debt.amount -= amount;
        credit.amount -= amount;

        // Reinsertar si aún queda deuda o crédito
        if (debt.amount > 0) {
          debts.unshift(debt);
        }
        if (credit.amount > 0) {
          credits.unshift(credit);
        }
      }
    }
  }

  assignTasks(tasks: TasksResponse[]): void {
    // Crear un mapa de tareas por usuario
    const userTasksMap = new Map<string, TasksResponse[]>();
    tasks.forEach((task) => {
      const userId = typeof task.user === 'string' ? task.user : task.user.id;
      if (!userTasksMap.has(userId)) {
        userTasksMap.set(userId, []);
      }
      userTasksMap.get(userId)?.push(task);
    });

    // Separar las tareas entre las propias y las de los demás
    this.myTasks = userTasksMap.get(this.userId) || [];
    this.otherTasks = this.homeUsers
      .filter((user) => user.id !== this.userId && userTasksMap.has(user.id))
      .map((user) => ({
        user,
        tasks: userTasksMap.get(user.id) || [],
      }));
  }

  toggleTask(userId: string): void {
    this.taskExpandState[userId] = !this.taskExpandState[userId];
  }

  isTaskExpanded(userId: string): boolean {
    return !!this.taskExpandState[userId];
  }
}
