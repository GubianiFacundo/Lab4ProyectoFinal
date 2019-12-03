export class Adicion {
  fecha: Date;
  nro_mesa: Number;
  id_mozo: Number;
  estado: String;
  total: Number;

  constructor() {
      this.fecha = new Date();
      this.nro_mesa = 0;
      this.id_mozo = 0;
      this.estado = '';
      this.total = 0;
  }
}
