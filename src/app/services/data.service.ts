import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
const baseUrl = 'http://localhost:8000';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpCli: HttpClient) {
  }

  postMozo(nombre: String, nro_mozo: Number) {
    const body = { nombre: nombre, nro_mozo: nro_mozo }
    return this.httpCli.post(baseUrl + '/api/registerMozo', body, httpOptions);
  }
}
