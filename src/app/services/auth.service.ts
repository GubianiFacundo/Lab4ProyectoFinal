import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Usuario } from '../classes/usuario';
import { BehaviorSubject } from 'rxjs';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  user = new Usuario();
  redirectUrl: string;
  // fijo el rol NON como no logueado en el constructor de la clase usuario
  // y con el BehaviorSubject logueado casteo el usuario con el "quien"
  private logueado = new BehaviorSubject(this.user);
  quien = this.logueado.asObservable();

  constructor(private client: HttpClient) {

  }

  isLogged() { return this.user.rol !== 'NON'; }

  nuevoLogueado(u: Usuario) {
    this.user = u;
    this.logueado.next(this.user);

  }

  login(nombre: String, pass: String) {
    const body = { nombre: nombre, pass: pass };
    return this.client.post('http://localhost:8000/api/login', body, httpOptions);
  }

 logout() { this.nuevoLogueado(new Usuario()); }

}
