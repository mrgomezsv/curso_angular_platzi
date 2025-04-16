import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [CommonModule, FormsModule],
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
  name = signal('Juan');
  lastName = 'Perez';
  age = 25;
  email = 'juan.perez@gmail.com';
  phone = '+54 9 11 3333-4444';
  address = 'Av. Corrientes 123';
  city = 'Buenos Aires';
  country = 'Argentina';
  nameUser = 'Mario';
  img = 'https://w3schools.com/howto/img_avatar.png';
  disabled = true;

  person = signal({
    name: 'Mario',
    age: 20
  });

  clickHandler() {
    alert('click');
    // this.disabled = !this.disabled;
  }


  changeInput(event: Event) {
    const input = event.target as HTMLInputElement
    const newValue = input.value;
    this.name.set(newValue);
  } 

  keydownHandler(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement
    console.log(input.value);
  }

  tasks2 = signal([
    'Ir al gimnasio',
    'Pagar la luz',
    'Pagar el agua',
    'Pagar el internet',
    'Pagar el gas',
    'Pagar el teléfono',
    'Pagar el internet',
  ])

  cambiarEdad() {
    this.person.update(person => ({
      ...person,
      age: person.age === 18 ? 14 : 18
    }));
  }

  cambiarNombre() {
    this.person.update(person => ({
      ...person,
      name: person.name === 'Mario' ? 'Juan' : 'Mario'
    }));
  }
}
