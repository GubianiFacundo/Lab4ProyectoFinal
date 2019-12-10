export class Adicion {
  fecha_ini: Date;
  fecha_fin: Date;
  nro_mesa: Number;
  id_mozo: Number;
  estado: String;
  total: Number;
  detalles: {
    plato: {
      id: Number;
    }
  };

  constructor() {
    this.fecha_ini = new Date();
    this.fecha_fin = new Date();
    this.nro_mesa = 1;
    this.id_mozo = 1;
    this.estado = '';
    this.total = 0;
    this.detalles = {
      plato: {
        id: -1,
      },
    }
  }
}
