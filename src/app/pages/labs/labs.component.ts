import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})
export class LabsComponent {
  title = 'todoapp';
  welcome = 'Martes 16 de abril de 2025';
  tasks = [
    'Ir al gimnasio',
    'Pagar la luz',
    'Pagar el agua',
    'Pagar el internet',
    'Pagar el gas',
    'Pagar el teléfono',
    'Pagar el internet',
  ]
}
