import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TarjetaCredito } from './components/tarjeta-credito/tarjeta-credito';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TarjetaCredito, ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('frontend');
}
