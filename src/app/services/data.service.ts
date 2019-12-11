import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

var httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
const baseUrl = 'http://localhost:8000';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpCli: HttpClient) {
  }
  // USUARIOS 
  postUsuario(nombre: String, pass: String) {
    const body = { nombre: nombre, pass: pass }
    return this.httpCli.post(baseUrl + '/api/register', body, httpOptions);
  }

  deleteUsuario(id: Number) {
    return this.httpCli.delete(baseUrl + '/api/deleteUser/' + id, httpOptions);
  }

  putUsuario(id: Number, body: Object) {
    return this.httpCli.put(baseUrl + '/api/modificarUser/' + id, body, httpOptions);
  }

  getUsuario() {
    return this.httpCli.get(baseUrl + '/api/usuarios', httpOptions);
  }

  // MOZO
  postMozo(nombre: String, nro_mozo: Number) {
    const body = { nombre: nombre, nro_mozo: nro_mozo }
    return this.httpCli.post(baseUrl + '/api/registerMozo', body, httpOptions);
  }

  deleteMozo(id: Number) {
    return this.httpCli.delete(baseUrl + '/api/deleteMozo/' + id, httpOptions);
  }

  putMozo(id: Number, body: Object) {
    return this.httpCli.put(baseUrl + '/api/modificarMozo/' + id, body, httpOptions);
  }

  getMozo() {
    return this.httpCli.get(baseUrl + '/api/mozo', httpOptions);
  }

  // PLATO
  postPlato(desc: String, precio_costo: Number, porc_gan: Number) {
    const body = { desc: desc, precio_costo: precio_costo, porc_gan: porc_gan }
    return this.httpCli.post(baseUrl + '/api/registerPlato', body, httpOptions);
  }

  deletePlato(id: Number) {
    return this.httpCli.delete(baseUrl + '/api/deletePlato/' + id, httpOptions);
  }

  putPlato(id: Number, body: Object) {
    return this.httpCli.put(baseUrl + '/api/modificarPlato/' + id, body, httpOptions);
  }

  getPlato() {
    return this.httpCli.get(baseUrl + '/api/platos', httpOptions);
  }

  getPlatoId(id: Number) {
    return this.httpCli.get(baseUrl + '/api/platos/' + id, httpOptions);
  }

  // ADICIONES
  postAdicion(fecha_fin: Date, nro_mesa: Number, id_mozo: Number) {
    const body = { fecha_fin: fecha_fin, nro_mesa: nro_mesa, id_mozo: id_mozo }
    return this.httpCli.post(baseUrl + '/api/registerAdicion', body, httpOptions);
  }

  deleteAdicion(id: Number) {
    return this.httpCli.delete(baseUrl + '/api/deleteAdicion/' + id, httpOptions);
  }

  putAdicion(id: Number, body: Object) {
    return this.httpCli.put(baseUrl + '/api/modificarAdicion/' + id, body, httpOptions);
  }

  getAdicion(fecha_ini: Date, fecha_fin: Date, id_mozo: String) {
    if (id_mozo == undefined || id_mozo == 'undefined' || id_mozo == null || id_mozo == 'null' || id_mozo == '') {
      return this.httpCli.get(baseUrl + '/api/adiciones/?fecha_ini=' + fecha_ini + '&fecha_fin=' + fecha_fin, httpOptions);
    } else {
      return this.httpCli.get(baseUrl + '/api/adiciones/?fecha_ini=' + fecha_ini + '&fecha_fin=' + fecha_fin + '&id_mozo=' + id_mozo, httpOptions);
    }
  }

  // DETALLE
  postDetalle(id_plato: String, cantidad: String, precio_unit: String, id_adicion: String) {
    const body = { id_plato: id_plato, cantidad: cantidad, precio_unit: precio_unit, id_adicion: id_adicion }
    return this.httpCli.post(baseUrl + '/api/registerDetalle', body, httpOptions);
  }

  deleteDetalle(id: Number) {
    return this.httpCli.delete(baseUrl + '/api/deleteDetalle/' + id, httpOptions);
  }

  putDetalle(id: Number, body: Object) {
    return this.httpCli.put(baseUrl + '/api/modificarDetalle/' + id, body, httpOptions);
  }

  getDetalle(id_adicion: Number) {
    return this.httpCli.get(baseUrl + '/api/detalles/?id_adicion=' + id_adicion, httpOptions);
  }
}
