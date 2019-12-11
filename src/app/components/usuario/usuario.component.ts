import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Usuario } from 'src/app/classes/usuario';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit, OnDestroy {

  user = new Usuario();
  userEdit = { nombre: '', pass: '', rol_id: 'USR' };
  loggedUserName: String;
  loggedUserRol: String;
  ok = false;
  notOk = false;
  okEdit = false;
  notOkEdit = false;
  okDel = false;
  notOkDel = false;
  response = {};
  lista = [];

  constructor(private dataSrv: DataService) { }

  ngOnInit() {
    this.loggedUserName = sessionStorage.getItem('user');
    console.log(this.loggedUserName)

    this.obtenerUser()
  }

  ngOnDestroy() {
    this.obtenerUser()
  }

  async refresh() {
    await this.ngOnDestroy();
    await this.ngOnInit();
  }

  obtenerUser() {
    this.dataSrv.getUsuario().subscribe((res: []) => {
      console.log(res)
      this.lista = res;
    },
      (error) => {
        console.log(error)
      }
    )
  }

  editarUser(selectedItem: any) {
    var body = { nombre: this.userEdit.nombre, pass: this.userEdit.pass, rol_id: this.userEdit.rol_id }
    if (this.userEdit.nombre == '') {
      body.nombre = selectedItem.nombre
    }
    if (this.userEdit.pass == '') {
      body.pass = selectedItem.pass
    }
    if (this.userEdit.rol_id == '') {
      body.rol_id = selectedItem.rol_id
    }

    this.dataSrv.putUsuario(selectedItem.id, body).subscribe((res) => {
      console.log(res)
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
    this.userEdit.nombre = '';
    this.userEdit.pass = '';
    this.userEdit.rol_id = 'USR';
    this.obtenerUser();
  }

  borrarUser(selectedItem: any) {
    this.dataSrv.deleteUsuario(selectedItem.id).subscribe((res) => {
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
    this.obtenerUser();
  }

}
