import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-tarjeta-credito',
  templateUrl: './tarjeta-credito.component.html',
  styleUrls: ['./tarjeta-credito.component.css']
})
export class TarjetaCreditoComponent implements OnInit {
  listTarjeta: any[] = [
    {titular: 'Fernando N', numTarjeta: '5489714562130003', fechaexp:'11/23', cvv:'845'},
    {titular: 'Juan Perez', numTarjeta: '5489714300035621', fechaexp:'05/27', cvv:'965'},
    {titular: 'Mari Carmen', numTarjeta: '5445621300897103', fechaexp:'12/24', cvv:'005'},
  ];

  form: FormGroup;

  constructor(private fb: FormBuilder) { 
    this.form = this.fb.group({
      titular: ['', Validators.required],
      numTarjeta: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(16)]],
      fechaExp: ['', [Validators.required, Validators.maxLength(5), Validators.minLength(5)]],
      cvv: ['', [Validators.required, Validators.maxLength(3), Validators.minLength(3)]]
    })
  }

  ngOnInit(): void {
  }

  addTarjeta() {
    
    const tarjeta: any = {
      titular: this.form.get('titular')?.value,
      numTarjeta: this.form.get('numTarjeta')?.value,
      fechaExp: this.form.get('fechaExp')?.value,
      cvv: this.form.get('cvv')?.value
    }
    this.listTarjeta.push(tarjeta);
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Tarjeta guardada con éxito!',
      showConfirmButton: false,
      timer: 1500
    });
    this.form.reset();
  }

  eliminarTarjeta(index: number) {
    
    Swal.fire({
      title: 'Está seguro de Eliminar esta Tarjeta?',     
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#198754',
      cancelButtonColor: '#dc3545',
      confirmButtonText: 'Si, borrarla!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
          title: 'Tarjeta borrada con éxito!',
          showConfirmButton: false,
          timer: 1500
      });
        this.listTarjeta.splice(index, 1);
      }
    });
  }

}
