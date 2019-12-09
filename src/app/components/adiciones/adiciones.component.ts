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
  adicionEdit = { nro_mesa: -1, id_mozo: -1, fecha_fin: new Date() };
  fecha_ini: Date;
  fecha_fin: Date;
  ok = false;
  notOk = false;
  okEdit = false;
  notOkEdit = false;
  okDel = false;
  notOkDel = false;
  response = {};
  lista = [];
  listaMozos = [];
  listaDetalles = [];
  selectedMozo: '';

  constructor(private dataSrv: DataService) {

  }

  ngOnInit() {
    this.fecha_ini = new Date();
    this.fecha_ini.setMonth(this.fecha_ini.getMonth() - 1);
    this.fecha_fin = new Date();


    this.obtenerMozos();
    // this.obtenerAdicion()
  }

  ngOnDestroy() {
    this.obtenerAdicion()
  }

  async refresh() {
    await this.ngOnDestroy();
    await this.ngOnInit();
  }

  generarAdicion() {
    this.dataSrv.postAdicion(this.adicion.fecha_fin, this.adicion.nro_mesa, this.adicion.id_mozo).subscribe((res) => {
      this.ok = true;
      this.response = res;
      setTimeout(() => {
        this.ok = false;
      }, 2500);
    },
      (error) => {
        this.notOk = true;
        this.response = error.error;
        setTimeout(() => {
          this.notOk = false;
        }, 2500);
      })

    this.obtenerAdicion()
  }

  obtenerAdicion() {
    this.dataSrv.getAdicion(this.fecha_ini, this.fecha_fin, this.selectedMozo).subscribe((res: []) => {
      console.log(res)
      this.lista = res;
      res.forEach((e: any) => {
        // this.obtenerDetalle(e.id)
        this.dataSrv.getDetalle(e.id).subscribe((resp: []) => {
          // this.lista.detalles = resp;
        })
      });
      console.log(this.lista)
    },
      (error) => {
        console.log(error)
      })
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
    this.dataSrv.deleteAdicion(selectedItem.id).subscribe((res) => {
      this.okDel = true;
      this.response = res;
      setTimeout(() => {
        this.okDel = false;
      }, 2500);
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
