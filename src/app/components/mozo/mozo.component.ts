import { Component, OnInit } from '@angular/core';
import { Mozo } from 'src/app/classes/mozo';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-mozo',
  templateUrl: './mozo.component.html',
  styleUrls: ['./mozo.component.css']
})
export class MozoComponent implements OnInit {

  mozo = new Mozo();

  constructor(private dataSrv: DataService) {

  }

  ngOnInit() {
  }

  generarMozo() {
    this.dataSrv.postMozo(this.mozo.nombre, this.mozo.nro_mozo).subscribe((res) => {
      console.log(res);
    })
  }
}
