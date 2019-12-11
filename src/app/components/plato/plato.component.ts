import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Plato } from 'src/app/classes/plato';

@Component({
  selector: 'app-plato',
  templateUrl: './plato.component.html',
  styleUrls: ['./plato.component.css']
})
export class PlatoComponent implements OnInit, OnDestroy {

  plato = new Plato();
  platoEdit = { desc: '', precio_costo: 0, porc_gan: 0 };
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
    this.obtenerPlato()
  }

  ngOnDestroy() {
    this.obtenerPlato()
  }

  async refresh() {
    await this.ngOnDestroy();
    await this.ngOnInit();
  }

  generarPlato() {
    this.dataSrv.postPlato(this.plato.desc, this.plato.precio_costo, this.plato.porc_gan).subscribe((res) => {
      this.ok = true;
      this.response = res;
      setTimeout(() => {
        this.ok = false;
      }, 2500);
      this.refresh()
    },
      (error) => {
        this.notOk = true;
        this.response = error.error;
        setTimeout(() => {
          this.notOk = false;
        }, 2500);
      })

    this.refresh()
  }

  obtenerPlato() {
    this.dataSrv.getPlato().subscribe((res: []) => {
      console.log(res)
      this.lista = res;
    },
      (error) => {
        console.log(error)
      })
  }

  editarPlato(selectedItem: any) {
    var body = { desc: this.platoEdit.desc, precio_costo: this.platoEdit.precio_costo, porc_gan: this.platoEdit.porc_gan }
    if (this.platoEdit.desc == '') {
      body.desc = selectedItem.desc
    }
    if (this.platoEdit.precio_costo == 0) {
      body.precio_costo = selectedItem.precio_costo
    }
    if (this.platoEdit.porc_gan == 0) {
      body.porc_gan = selectedItem.porc_gan
    }

    this.dataSrv.putPlato(selectedItem.id, body).subscribe((res) => {
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

    this.platoEdit = { desc: '', precio_costo: 0, porc_gan: 0 };
    this.refresh()
  }

  borrarPlato(selectedItem: any) {
    this.dataSrv.deletePlato(selectedItem.id).subscribe((res) => {
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
    this.refresh()
  }

}
