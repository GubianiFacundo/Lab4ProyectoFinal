import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/classes/usuario';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  usuario: Usuario;
  imUser = new Subscription();
  logged = sessionStorage.getItem('isLogged')

  constructor(
    public authSrv: AuthService,
    private router: Router
  ) {
    this.imUser = this.authSrv.quien.subscribe((user: Usuario) => this.usuario = user);
  }

  ngOnInit() {
    if (this.usuario.rol === 'NON') {
      this.router.navigate(['/']);
    }

  }

  salir() {
    this.authSrv.logout();
    // sessionStorage.setItem('isLogged', 'false');
    // this.logged = sessionStorage.getItem('isLogged');
    // sessionStorage.clear();
    this.usuario = new Usuario();
    this.router.navigate(['/']);
  }

  ngOnDestroy() {
    this.imUser.unsubscribe;
  }

}
