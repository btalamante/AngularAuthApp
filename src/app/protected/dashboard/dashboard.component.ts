import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Usuario } from '../../auth/interfaces/interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
    `
      * {
        margin: 15px;
      }
    `
  ]
})
export class DashboardComponent implements OnInit {

  get user(): Usuario{
    return this.auth.usuario;
  }

  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
  }

  logOut() {
    this.auth.logOut();
    this.router.navigateByUrl('/auth');
  }

}
