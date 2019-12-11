import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/classes/usuario';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  usuario = { nombre: '', pass: '', fechaFin: Date() };
  error = false;
  enviado = false;
  ok = false;
  notOk = false;
  response = {};

  constructor(private dataSrv: DataService, private router: Router) { }

  ngOnInit() {
  }

  registrar() {
    this.dataSrv.postUsuario(this.usuario.nombre, this.usuario.pass).subscribe((res) => {
      this.ok = true;
      this.response = res;
      setTimeout(() => {
        this.ok = false;
        this.router.navigate(['/login']);
      }, 2500);
    },
      (error) => {
        this.notOk = true;
        this.response = error.error;
        setTimeout(() => {
          this.notOk = false;
        }, 2500);
      })
  }
}
