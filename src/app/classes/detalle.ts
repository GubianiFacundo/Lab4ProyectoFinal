export class Detalle {
  id_plato: Number; 
  cantidad: Number;
  precio_unit: Number;
  subtotal: Number;
  id_adicion: Number;

  constructor() {
      this.id_plato = 0;
      this.cantidad = 0;
      this.precio_unit = 0;
      this.id_adicion = 0;
      this.subtotal = 0;
  }
}
