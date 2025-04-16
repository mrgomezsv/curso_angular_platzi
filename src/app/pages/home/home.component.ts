import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Task } from '../../models/task.model';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  tasks = signal<Task[]>([
    {
      id: Date.now(),
      title: 'Ir al gimnasio',
      completed: false,
    },
    {
      id: Date.now(),
      title: 'Pagar la luz',
      completed: false,
    },
    {
      id: Date.now(),
      title: 'Pagar el agua',
      completed: false,
    }
  ]);

  changeHandler(event: Event) {
    const input = event.target as HTMLInputElement;
    const newTask = input.value;
    if (newTask.trim()) {
      this.addTask(newTask);
      input.value = '';
    }
  }

  addTask(title: string) {
    const newTask: Task = {
      id: Date.now(),
      title,
      completed: false,
    };
    this.tasks.update(tasks => [...tasks, newTask]);
  }

  deleteTask(index: number) {
    this.tasks.update((task) => task.filter((task, position) => position !== index));
  }

  updateTask(index: number) {
    this.tasks.update((task) => {
      return task.map((task, position) => {
        if (position == index) {
          return {
            ...task,
            completed: !task.completed,
          }
        }
        return task;
      })
    })
  }
}
