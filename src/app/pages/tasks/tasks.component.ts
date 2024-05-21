import { Component, OnInit } from '@angular/core';
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
import {
  ProfileResponse,
  TaskBody,
  TasksResponse,
} from '../../models/general-types';
import { format, parse } from 'date-fns';
import { NgForm } from '@angular/forms';
import { TasksService } from '../../services/tasks.service';
import { HttpStatusCode } from '@angular/common/http';
import { UserService } from '../../services/user.service';
import * as ProfileActions from '../../store/actions/profile.actions';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
  providers: [],
})
export class TasksComponent implements OnInit {
  faCircleCheck = faCircleCheck;
  faTrash = faTrash;
  faChevronUp = faChevronUp;
  faChevronDown = faChevronDown;
  tasks: (TasksResponse & { isNew?: boolean; isEdited?: boolean })[] = [];

  successMessageVisible = false;
  errorMessage = '';
  sortCreationDateAsc = true;
  sortStatusAsc = true;
  userId: string = '';

  constructor(
    private store: Store<AppState>,
    private _tasksService: TasksService,
    private _userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadInitialTasks();
    this.store.select(UserSelectors.selectUserId).subscribe((id) => {
      this.userId = id;
    });
  }

  loadInitialTasks() {
    this.tasks = [];
    this.store
      .select(ProfileSelectors.selectProfile)
      .subscribe((profile: ProfileState) => {
        if (profile && profile.tasks) {
          profile.tasks.forEach((task) => {
            let formattedTask = {
              ...task,
              dateCreated: format(
                parse(task.dateCreated, 'dd/MM/yyyy', new Date()),
                'yyyy-MM-dd'
              ),
            };
            this.tasks.push(formattedTask);
          });
        }
      });
  }

  addTask() {
    const newTask: TasksResponse & { isNew: boolean } = {
      id: this.tasks.length + 1,
      description: '',
      dateCreated: new Date().toISOString().split('T')[0],
      status: 0,
      user: { id: this.userId },
      isNew: true,
    };
    this.tasks.push(newTask);
  }

  deleteTask(id: number) {
    this._tasksService.deleteTask(id).subscribe({
      next: () => {
        this.handleSuccess();
      },
      error: this.handleError.bind(this),
    });
  }

  markAsEdited(task: TasksResponse & { isNew?: boolean; isEdited?: boolean }) {
    if (!task.isNew) {
      task.isEdited = true;
    }
  }

  async saveTasks(f: NgForm) {
    if (!f.valid) return;

    const newTasks = this.tasks.filter((task) => task.isNew);
    const editedTasks = this.tasks.filter((task) => task.isEdited);

    try {
      const savePromises = newTasks.map((task) => {
        const { isNew, ...taskToSave } = task;
        return lastValueFrom(this._tasksService.saveTask(taskToSave));
      });

      const updatePromises = editedTasks.map((task) => {
        const { isEdited, ...taskToUpdate } = task;
        return lastValueFrom(
          this._tasksService.updateTask(task.id, taskToUpdate)
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
          ProfileActions.updateTasks({
            tasks: response.tasks,
          })
        );
        this.loadInitialTasks();
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
    this.tasks.sort((a, b) => {
      const comparison =
        new Date(a.dateCreated).getTime() - new Date(b.dateCreated).getTime();
      return this.sortCreationDateAsc ? comparison : -comparison;
    });
    this.sortCreationDateAsc = !this.sortCreationDateAsc;
  }

  sortByStatus() {
    this.tasks.sort((a, b) => {
      const comparison = a.status - b.status;
      return this.sortStatusAsc ? comparison : -comparison;
    });
    this.sortStatusAsc = !this.sortStatusAsc;
  }
}
