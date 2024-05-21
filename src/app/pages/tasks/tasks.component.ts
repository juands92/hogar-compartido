import { Component, OnInit } from '@angular/core';
import { faCircleCheck, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Task } from '../../models/Forms';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
  providers: [],
})
export class TasksComponent implements OnInit {
  faCircleCheck = faCircleCheck;
  faTrash = faTrash;
  tasks: Task[] = [];
  successMessageVisible = false;
  errorMessage = '';
  sortCreationDateAsc = true;
  sortStatusAsc = true;

  ngOnInit(): void {
    this.loadInitialTasks();
  }

  loadInitialTasks() {
    this.tasks = [
      {
        id: 1,
        description: 'Limpiar la cocina',
        creationDate: '2023-01-01',
        status: 0,
      },
      {
        id: 2,
        description: 'Aspirar la sala',
        creationDate: '2023-01-05',
        status: 1,
      },
      {
        id: 3,
        description: 'Lavar los platos',
        creationDate: '2023-02-10',
        status: 0,
      },
      {
        id: 4,
        description: 'Hacer la cama',
        creationDate: '2023-03-15',
        status: 1,
      },
      {
        id: 5,
        description: 'Lavar la ropa',
        creationDate: '2023-04-20',
        status: 0,
      },
      {
        id: 6,
        description: 'Planchar la ropa',
        creationDate: '2023-05-25',
        status: 0,
      },
      {
        id: 7,
        description: 'Regar las plantas',
        creationDate: '2023-06-30',
        status: 1,
      },
      {
        id: 8,
        description: 'Sacar la basura',
        creationDate: '2023-07-04',
        status: 0,
      },
      {
        id: 9,
        description: 'Limpiar el baño',
        creationDate: '2023-08-10',
        status: 0,
      },
      {
        id: 10,
        description: 'Organizar el armario',
        creationDate: '2023-09-15',
        status: 1,
      },
    ];
  }

  addTask() {
    const newTask: Task = {
      id: this.tasks.length + 1,
      description: '',
      creationDate: new Date().toISOString().split('T')[0],
      status: 0,
    };
    this.tasks.push(newTask);
  }

  deleteTask(id: number) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  saveTasks(form: any) {
    if (form.valid) {
      console.log('Tareas guardadas:', this.tasks);
      this.successMessageVisible = true;
      setTimeout(() => (this.successMessageVisible = false), 3000);
    } else {
      this.errorMessage = 'Por favor, complete todos los campos.';
      setTimeout(() => (this.errorMessage = ''), 3000);
    }
  }

  sortByCreationDate() {
    this.tasks.sort((a, b) => {
      const comparison =
        new Date(a.creationDate).getTime() - new Date(b.creationDate).getTime();
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
