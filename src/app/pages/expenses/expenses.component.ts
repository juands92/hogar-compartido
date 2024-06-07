import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {
  faCircleCheck,
  faTrash,
  faChevronUp,
  faChevronDown,
} from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { AppState, ProfileState } from '../../store/state/state';
import * as ProfileSelectors from '../../store/selectors/profile.selectors';
import * as UserSelectors from '../../store/selectors/user.selectors';
import { ProfileResponse, ExpensesResponse } from '../../models/general-types';
import { format, parse } from 'date-fns';
import { NgForm } from '@angular/forms';
import { ExpensesService } from '../../services/expenses.service';
import { UserService } from '../../services/user.service';
import * as ProfileActions from '../../store/actions/profile.actions';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css'],
  providers: [],
})
export class ExpensesComponent implements OnInit {
  faCircleCheck = faCircleCheck;
  faTrash = faTrash;
  faChevronUp = faChevronUp;
  faChevronDown = faChevronDown;
  expenses: (any & { isNew?: boolean; isEdited?: boolean })[] = [];

  successMessageVisible = false;
  errorMessage = '';
  sortCreationDateAsc = true;
  sortAmountAsc = true;
  userId: string = '';
  homeId?: string = '';

  constructor(
    private store: Store<AppState>,
    private _expensesService: ExpensesService,
    private _userService: UserService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadInitialExpenses();
    this.store
      .select(ProfileSelectors.selectProfile)
      .subscribe((profile: ProfileState) => {
        this.homeId = profile.home?.id;
      });
    this.store.select(UserSelectors.selectUserId).subscribe((id) => {
      this.userId = id;
    });
  }

  loadInitialExpenses() {
    this.expenses = [];
    this.store
      .select(ProfileSelectors.selectProfile)
      .subscribe((profile: ProfileState) => {
        if (profile && profile.home?.expenses && profile.expenses) {
          const expenseIds = new Set(profile.expenses);
          profile.home.expenses.forEach((expense) => {
            if (expenseIds.has(expense.id)) {
              let formattedExpense = {
                ...expense,
                dateCreated: format(
                  parse(expense.dateCreated, 'dd/MM/yyyy', new Date()),
                  'yyyy-MM-dd'
                ),
              };
              this.expenses.push(formattedExpense);
            }
          });
        }
      });
  }

  addExpense() {
    const newTask: ExpensesResponse & { isNew: boolean } = {
      id: this.expenses.length + 1,
      description: '',
      dateCreated: new Date().toISOString().split('T')[0],
      amount: 0.0,
      home: { id: this.homeId! },
      user: { id: this.userId },
      isNew: true,
    };
    this.expenses.push(newTask);
  }

  deleteExpense(id: number) {
    const expenseIndex = this.expenses.findIndex(
      (expense) => expense.id === id
    );

    if (this.expenses[expenseIndex].isNew) {
      this.expenses.splice(expenseIndex, 1);
      this.cdr.detectChanges();
    } else {
      this._expensesService.deleteExpense(id).subscribe({
        next: () => {
          this.expenses.splice(expenseIndex, 1);
          this.handleSuccess();
        },
        error: this.handleError.bind(this),
      });
    }
  }

  markAsEdited(
    expense: ExpensesResponse & { isNew?: boolean; isEdited?: boolean }
  ) {
    if (!expense.isNew) {
      expense.isEdited = true;
    }
  }

  async saveExpenses(f: NgForm) {
    if (!f.valid) return;

    const newExpenses = this.expenses.filter((expense) => expense.isNew);
    const editedExpenses = this.expenses.filter((expense) => expense.isEdited);

    try {
      const savePromises = newExpenses.map((expense) => {
        const { isNew, ...expenseToSave } = expense;
        return lastValueFrom(this._expensesService.saveExpense(expenseToSave));
      });

      const updatePromises = editedExpenses.map((expense) => {
        const { isEdited, ...expenseToUpdate } = expense;
        return lastValueFrom(
          this._expensesService.updateExpense(expense.id, expenseToUpdate)
        );
      });

      await Promise.all([...savePromises, ...updatePromises]);
      this.handleSuccess();
    } catch (error) {
      this.handleError();
    }
  }

  private handleSuccess() {
    this.successMessageVisible = true;
    this.updateProfileState();
    setTimeout(() => {
      this.successMessageVisible = false;
    }, 4000);
  }

  private updateProfileState() {
    this._userService.getUser(this.userId).subscribe({
      next: (response: ProfileResponse) => {
        this.store.dispatch(
          ProfileActions.updateHome({
            home: response.home,
          })
        );
        this.store.dispatch(
          ProfileActions.updateExpenses({
            expenses: response.expenses,
          })
        );
        this.loadInitialExpenses();
      },
      error: this.handleError.bind(this),
    });
  }

  private handleError() {
    this.errorMessage = '!Algo ha salido mal!';
    setTimeout(() => {
      this.errorMessage = '';
    }, 4000);
  }

  sortByCreationDate() {
    this.expenses.sort((a, b) => {
      const comparison =
        new Date(a.dateCreated).getTime() - new Date(b.dateCreated).getTime();
      return this.sortCreationDateAsc ? comparison : -comparison;
    });
    this.sortCreationDateAsc = !this.sortCreationDateAsc;
  }

  sortByAmount() {
    this.expenses.sort((a, b) => {
      const comparison = a.amount - b.amount;
      return this.sortAmountAsc ? comparison : -comparison;
    });
    this.sortAmountAsc = !this.sortAmountAsc;
  }

  trackByFn(index: number, item: any): number {
    return item.id;
  }
}
