import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  tasks2 = signal([
    'Ir al gimnasio',
    'Pagar la luz',
    'Pagar el agua',
    'Pagar el internet',
    'Pagar el gas',
    'Pagar el teléfono',
    'Pagar el internet',
  ]);

  changeHandler(event: Event) {
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.tasks2.update((task2) => [...this.tasks2(), newValue]);
  }

  deleteTask(index: number) {
    this.tasks2.update((task2) => task2.filter((task, position) => position !== index));
  }
}
