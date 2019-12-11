import { Component, OnInit, OnDestroy } from '@angular/core';
import { Mozo } from 'src/app/classes/mozo';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-mozo',
  templateUrl: './mozo.component.html',
  styleUrls: ['./mozo.component.css'],
})
export class MozoComponent implements OnInit, OnDestroy {

  mozo = new Mozo();
  mozoEdit = { nombre: '', nro_mozo: -1 };
  ok = false;
  notOk = false;
  okEdit = false;
  notOkEdit = false;
  okDel = false;
  notOkDel = false;
  response = {};
  lista = [];

  constructor(private dataSrv: DataService) {

  }

  ngOnInit() {
    this.obtenerMozo()
  }

  ngOnDestroy() {
    this.obtenerMozo()
  }

  async refresh() {
    await this.ngOnDestroy();
    await this.ngOnInit();
  }

  generarMozo() {
    this.dataSrv.postMozo(this.mozo.nombre, this.mozo.nro_mozo).subscribe((res) => {
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

      this.mozo.nombre = '';

    this.refresh()
  }

  obtenerMozo() {
    this.dataSrv.getMozo().subscribe((res: []) => {
      console.log(res)
      this.lista = res;
    },
      (error) => {
        console.log(error)
      })
  }

  editarMozo(selectedItem: any) {
    var body = { nombre: this.mozoEdit.nombre, nro_mozo: this.mozoEdit.nro_mozo }
    if (this.mozoEdit.nombre == '') {
      body.nombre = selectedItem.nombre
    }
    if (this.mozoEdit.nro_mozo == -1) {
      body.nro_mozo = selectedItem.nro_mozo
    }

    this.dataSrv.putMozo(selectedItem.id, body).subscribe((res) => {
      this.okEdit = true;
      this.response = res;
      setTimeout(() => {
        this.okEdit = false;
      }, 2500);
      this.refresh()
    },
      (error) => {
        this.notOkEdit = true;
        this.response = error.error;
        setTimeout(() => {
          this.notOkEdit = false;
        }, 2500);
      })
    this.mozoEdit.nombre = '';
    this.mozoEdit.nro_mozo = -1;
   
  }

  borrarMozo(selectedItem: any) {
    this.dataSrv.deleteMozo(selectedItem.id).subscribe((res) => {
      this.okDel = true;
      this.response = res;
      setTimeout(() => {
        this.okDel = false;
      }, 2500);
      this.refresh()
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
   
  }
}
