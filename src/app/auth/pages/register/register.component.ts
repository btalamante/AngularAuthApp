import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatosUsuario } from '../../interfaces/interface';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
  }

  registrar() {
    console.log(this.miFormulario.value);
    const { name, email, password } = this.miFormulario.value;
    const datosUsuario: DatosUsuario  = {
      name, 
      email,
      password
    }
    this.auth.registro( datosUsuario ).subscribe( {
      next: resp => {
        console.log(resp);
        if (resp === true) {
          this.router.navigateByUrl('/dashboard');
        }
        else {
          console.log(resp);
          Swal.fire( {
            icon: 'error',
            title: 'Oops...',
            text: `${resp}`,
            footer: '<a href="">¿Y si eliges otro correo?</a>'
          } );
        }
      },
      error: error => console.log
    } );
  }
}
