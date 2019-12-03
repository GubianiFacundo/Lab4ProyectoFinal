import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/classes/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario = { nombre: 'admin', pass: 'admin' };
  error = false;
  enviado = false;

  constructor(private authServer: AuthService, private router: Router) { }

  ngOnInit() {
  }

  ingresar() {
    this.enviado = true;
    this.authServer.login(this.usuario.nombre, this.usuario.pass)
      .subscribe((u: Usuario) => {
        if (u === null) {
          console.log(u);
          this.error = true;
          this.enviado = false;
        } else {
          console.log(u)
          this.authServer.nuevoLogueado(u);
          this.enviado = false;
          if (this.authServer.redirectUrl) {       
            this.router.navigate([this.authServer.redirectUrl]);
          } else {
            sessionStorage.setItem('isLogged', 'true');
            sessionStorage.setItem('user', this.usuario.nombre);
            this.router.navigate(['/register']);
          }
        }
      });
  }
}
