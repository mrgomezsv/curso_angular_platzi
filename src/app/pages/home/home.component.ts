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
}
