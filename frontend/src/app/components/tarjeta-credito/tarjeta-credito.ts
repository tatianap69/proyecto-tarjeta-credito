import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Tarjeta } from '../../service/tarjeta';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-tarjeta-credito',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './tarjeta-credito.html',
  styleUrl: './tarjeta-credito.scss',
})
export class TarjetaCredito {
  listadoTarjetas = [
    {
      titular: 'Juan Pérez',
      numeroTarjeta: '1234 5678 9012 3456',
      fechaExpiracion: '12/25',
      ccv: '123',
    },
    {
      titular: 'Maria López',
      numeroTarjeta: '2345 6789 0123 4567',
      fechaExpiracion: '10/29',
      ccv: '333',
    },
  ];

  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private _tarjetaService: Tarjeta
  ) {
    this.form = this.fb.group({
      titular: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z\s]*$/),
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      numeroTarjeta: [
        '',
        [Validators.required, Validators.pattern(/^\d{16}$/)],
      ],
      fechaExpiracion: [
        '',
        [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)],
      ],
      ccv: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]],
    });
  }
  submitted = false;

  agregarTarjeta() {
    if (this.form.invalid) {
      this.submitted = true;
      return;
    }
    const nuevaTarjeta = {
      titular: this.form.value.titular,
      numeroTarjeta: this.form.value.numeroTarjeta,
      fechaExpiracion: this.form.value.fechaExpiracion,
      ccv: this.form.value.ccv,
    };

    this.listadoTarjetas.push(nuevaTarjeta);
    this.toastr.success(
      'La tarjeta fue registrada con éxito',
      'Tarjeta registrada!'
    );
    this.form.reset();
    this.submitted = false;
  }

  obtenerTarjetas() {
    this._tarjetaService.getListadoTarjetas().subscribe((data) => {
      console.log(data);
    }, error => {
      console.error('Error al obtener las tarjetas:', error);
    });
  }

  eliminarTarjeta(index: number) {
    this.listadoTarjetas.splice(index, 1);
    this.toastr.error(
      'La tarjeta fue eliminada con éxito',
      'Tarjeta eliminada!'
    );
  }
   ngOnInit(): void {
    this.obtenerTarjetas();
  }
}
