import { Component, OnInit, OnDestroy } from '@angular/core';
import { Adicion } from 'src/app/classes/adicion';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-adiciones',
  templateUrl: './adiciones.component.html',
  styleUrls: ['./adiciones.component.css']
})
export class AdicionesComponent implements OnInit, OnDestroy {


  adicion = new Adicion();
  adicionEdit = { nro_mesa: -1, id_mozo: -1, fecha_fin: new Date(), id_plato: -1, cantidad: -1, precio_unit: -1 };
  fecha_ini: Date;
  fecha_fin: Date;
  ok = false;
  notOk = false;
  okEdit = false;
  notOkEdit = false;
  okDel = false;
  notOkDel = false;
  response = {};
  lista: any;
  listaMozos = [];
  listaPlatos = [];
  listaDetalles = [];
  selectedMozo: '';
  selectedPlato = -1;
  // detallePrecioEdit = 0;

  constructor(private dataSrv: DataService) {

  }

  ngOnInit() {
    this.fecha_ini = new Date();
    this.fecha_ini.setMonth(this.fecha_ini.getMonth() - 1);
    this.fecha_fin = new Date();

    this.obtenerPlato();
    this.obtenerMozos();
    this.obtenerAdicion();
  }

  ngOnDestroy() {
    this.obtenerAdicion()
  }

  async refresh() {
    await this.ngOnDestroy();
    await this.ngOnInit();
  }

  obtenerPlato() {
    this.dataSrv.getPlato().subscribe((res: []) => {
      console.log(res)
      this.listaPlatos = res;
      this.listaPlatos.unshift({ id: '0', desc: '' });
    },
      (error) => {
        console.log(error)
      })
  }

  // obtenerPlatoId() {
  //   this.dataSrv.getPlatoId().subscribe((res: []) => {
  //     console.log(res)
  //     this.listaPlatos = res;
  //     this.listaPlatos.unshift({ id: '0', desc: '' });
  //   },
  //     (error) => {
  //       console.log(error)
  //     })
  // }

  generarAdicion() {
    this.dataSrv.postAdicion(this.adicion.fecha_fin, this.adicion.nro_mesa, this.adicion.id_mozo).subscribe((res) => {
      this.ok = true;
      this.response = res;
      setTimeout(() => {
        this.ok = false;
      }, 2500);
      this.refresh();
    },
      (error) => {
        this.notOk = true;
        this.response = error.error;
        setTimeout(() => {
          this.notOk = false;
        }, 2500);
      })

    this.refresh();
  }

  obtenerAdicion() {
    this.dataSrv.getAdicion(this.fecha_ini, this.fecha_fin, this.selectedMozo).subscribe((res: []) => {
      console.log(res)
      this.lista = res;
      console.log(this.lista)
    },
      (error) => {
        console.log(error)
      })
  }

  agregarDetalle(selectedItem: any) {
    this.dataSrv.postDetalle("0", "0", "0", selectedItem.id.toString()).subscribe((res: []) => {
      console.log(res)
      this.refresh();
    },
      (error) => {
        console.log(error)
      }
    )
    this.refresh();
  }

  editarDetalle(selectedItem: any) {
    var subtotal = this.adicionEdit.cantidad * selectedItem.plato.precio_plato;
    var body = { id_plato: this.selectedPlato, cantidad: this.adicionEdit.cantidad, precio_unit: this.adicionEdit.precio_unit, subtotal: subtotal }
    if (this.selectedPlato == -1) {
      body.id_plato = selectedItem.id_plato
    }
    if (this.adicionEdit.cantidad == -1) {
      body.cantidad = selectedItem.cantidad
    }
    // if (this.adicionEdit.precio_unit == -1) {
    //   body.precio_unit = selectedItem.precio_unit
    // }

    console.log(body.subtotal)

    this.dataSrv.putDetalle(selectedItem.id, body).subscribe((res) => {
      this.okEdit = true;
      this.response = res;
      setTimeout(() => {
        this.okEdit = false;
      }, 2500);
      this.refresh();
    },
      (error) => {
        this.notOkEdit = true;
        this.response = error.error;
        setTimeout(() => {
          this.notOkEdit = false;
        }, 2500);
      }
    )

    this.refresh();

  }

  borrarDetalle(selectedItem: any) {
    this.dataSrv.deleteDetalle(selectedItem.id).subscribe((res) => {
      this.okDel = true;
      this.response = res;
      setTimeout(() => {
        this.okDel = false;
      }, 2500);
      this.refresh();
    },
      (error) => {
        console.log(error)
        this.notOkDel = true;
        this.response = error.error;
        setTimeout(() => {
          this.notOkDel = false;
        }, 2500);
      }
    )

    this.refresh();
  }

  obtenerDetalle(selectedItem: any) {
    this.dataSrv.getDetalle(selectedItem.id).subscribe((res: []) => {
      console.log(res)
      this.listaDetalles = res;
    },
      (error) => {
        console.log(error)
      })
  }

  cerrarAdicion(selectedItem: any) {
    var total = 0;
    selectedItem.detalles.forEach(e => {
      total += e.subtotal
    });

    var body = { estado: 'CERRADA', total: total }

    if (confirm("No podrá editar la adición luego. Esta seguro que desea cerrarla ¿?")) {
      this.dataSrv.putAdicion(selectedItem.id, body).subscribe((res) => {
        this.okEdit = true;
        this.response = res;
        setTimeout(() => {
          this.okEdit = false;
        }, 2500);
        this.refresh();
      },
        (error) => {
          this.notOkEdit = true;
          this.response = error.error;
          setTimeout(() => {
            this.notOkEdit = false;
          }, 2500);
        }
      )

      this.refresh();
    } else {
      return false;
    }
  }

  editarAdicion(selectedItem: any) {
    var body = { nro_mesa: this.adicionEdit.nro_mesa, id_mozo: this.adicionEdit.id_mozo, fecha_fin: this.adicionEdit.fecha_fin }
    if (this.adicionEdit.nro_mesa == -1) {
      body.nro_mesa = selectedItem.nro_mesa
    }
    if (this.adicionEdit.id_mozo == -1) {
      body.id_mozo = selectedItem.id_mozo
    }
    if (this.adicionEdit.fecha_fin == new Date()) {
      body.fecha_fin = selectedItem.fecha_fin
    }

    this.dataSrv.putAdicion(selectedItem.id, body).subscribe((res) => {
      this.okEdit = true;
      this.response = res;
      setTimeout(() => {
        this.okEdit = false;
      }, 2500);
      this.refresh();
    },
      (error) => {
        this.notOkEdit = true;
        this.response = error.error;
        setTimeout(() => {
          this.notOkEdit = false;
        }, 2500);
      })

    this.refresh();
  }

  borrarAdicion(selectedItem: any) {
    let platos = [];
    selectedItem.detalles.forEach(e => {
      platos.push(e.plato)
    });

    // console.log(platos)

    if (confirm("Seguro que desea eliminar la Adición ¿?")) {

      this.dataSrv.deleteAdicion(selectedItem.id).subscribe((res) => {
        this.okDel = true;
        this.response = res;
        setTimeout(() => {
          this.okDel = false;
        }, 2500);
        this.refresh();
      },
        (error) => {
          console.log(error)
          this.notOkDel = true;
          this.response = error.error;
          setTimeout(() => {
            this.notOkDel = false;
          }, 2500);
        }
      )

      this.refresh();
    } else {
      return false;
    }


    // platos.forEach(e => {
    //   this.dataSrv.postPlato(e.desc, e.precio_costo, e.porc_gan).subscribe((res) => {
    //     this.ok = true;
    //     this.response = res;
    //     setTimeout(() => {
    //       this.ok = false;
    //     }, 2500);
    //   },
    //     (error) => {
    //       this.notOk = true;
    //       this.response = error.error;
    //       setTimeout(() => {
    //         this.notOk = false;
    //       }, 2500);
    //     })
    // });
  }

  obtenerMozos() {
    this.dataSrv.getMozo().subscribe((res: []) => {
      console.log(res)
      this.listaMozos = res;
      this.listaMozos.unshift({ id: '', nombre: '' });
    },
      (error) => {
        console.log(error)
      })
  }

}
