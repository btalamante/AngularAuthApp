import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatosUsuario, LoginError } from '../../interfaces/interface';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    email   : ['test1@test.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]]
  });

  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
  }

  login() {
    console.log(this.miFormulario.value);
    const { email, password } = this.miFormulario.value;
    const body: DatosUsuario = {
      email, password
    }
    this.auth.login(body).subscribe({
      next: (resp) => {
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
            footer: '<a href="">¿Revisaste tus credenciales?</a>'
          } );
        }
      },
      error: error => {
        Swal.fire( {
          icon: 'error',
          title: 'Oops...',
          text: 'Error en el subscribe',
          footer: '<a href="">Duh!</a>'
        } );
      }
    });
  }
}
