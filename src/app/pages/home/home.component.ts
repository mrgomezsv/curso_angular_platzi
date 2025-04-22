import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  private tasks = signal<Task[]>([
    {
      id: 1,
      title: 'Ir al gimnasio',
      completed: false,
    },
    {
      id: 2,
      title: 'Pagar la luz',
      completed: false,
    },
    {
      id: 3,
      title: 'Pagar el agua',
      completed: false,
    }
  ]);

  private editingTaskId = signal<number | null>(null);
  private editingTaskTitle = signal<string>('');

  // Computed properties
  readonly pendingTasks = computed(() => this.tasks().filter(task => !task.completed).length);
  readonly hasCompletedTasks = computed(() => this.tasks().some(task => task.completed));
  readonly filteredTasks = computed(() => {
    const currentRoute = window.location.pathname;
    if (currentRoute === '/pending') {
      return this.tasks().filter(task => !task.completed);
    } else if (currentRoute === '/completed') {
      return this.tasks().filter(task => task.completed);
    }
    return this.tasks();
  });

  // Public methods for template
  getTasks() {
    return this.tasks();
  }

  getFilteredTasks() {
    return this.filteredTasks();
  }

  isEditing(taskId: number): boolean {
    return this.editingTaskId() === taskId;
  }

  getEditingTitle(): string {
    return this.editingTaskTitle();
  }

  // Task management methods
  addTask(title: string) {
    if (!title.trim()) return;
    
    const newTask: Task = {
      id: Date.now(),
      title: title.trim(),
      completed: false,
    };
    
    this.tasks.update(tasks => [...tasks, newTask]);
  }

  deleteTask(taskId: number) {
    this.tasks.update(tasks => tasks.filter(task => task.id !== taskId));
  }

  toggleTaskCompletion(taskId: number) {
    this.tasks.update(tasks => 
      tasks.map(task => 
        task.id === taskId 
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  startEditing(taskId: number) {
    const task = this.tasks().find(t => t.id === taskId);
    if (task) {
      this.editingTaskTitle.set(task.title);
      this.editingTaskId.set(taskId);
    }
  }

  saveTask(taskId: number) {
    const newTitle = this.editingTaskTitle().trim();
    if (newTitle) {
      this.tasks.update(tasks => 
        tasks.map(task => 
          task.id === taskId 
            ? { ...task, title: newTitle }
            : task
        )
      );
    }
    this.cancelEditing();
  }

  cancelEditing() {
    this.editingTaskId.set(null);
    this.editingTaskTitle.set('');
  }

  updateEditingTitle(title: string) {
    this.editingTaskTitle.set(title);
  }

  clearCompleted() {
    this.tasks.update(tasks => tasks.filter(task => !task.completed));
  }

  // Event handlers
  handleNewTask(event: Event) {
    const input = event.target as HTMLInputElement;
    this.addTask(input.value);
    input.value = '';
  }

  handleEditEvent(event: Event, taskId: number) {
    const input = event.target as HTMLInputElement;
    this.updateEditingTitle(input.value);
  }

  handleSaveEvent(event: Event, taskId: number) {
    if (event.type === 'blur' || (event instanceof KeyboardEvent && event.key === 'Enter')) {
      this.saveTask(taskId);
    }
  }
}
