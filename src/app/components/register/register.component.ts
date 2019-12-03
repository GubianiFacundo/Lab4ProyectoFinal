import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/classes/usuario';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  usuario = { nombre: '', clave: '', fechaFin: Date() };
  error = false;
  enviado = false;

  constructor(private authServer: AuthService, private router: Router, private httpCli: HttpClient) { }

  ngOnInit() {
  }

  registrar() {
    this.httpCli.post('http://localhost:8000/api/register', {
      usuario: this.usuario.nombre,
      pass: this.usuario.clave,
      rol: 'SUP'
    }).subscribe(res => {
      console.log(res)
    })
  }
}