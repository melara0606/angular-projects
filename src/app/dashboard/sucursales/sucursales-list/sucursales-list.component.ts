import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

// Externos
import {
  Sucursal,
  Controller,
  SucursalesService
} from '../../all-utils';

@Component({
  selector: 'app-sucursales-list',
  templateUrl: './sucursales-list.component.html',
  styles: []
})
export class SucursalesListComponent extends Controller implements OnInit {
  public item: Sucursal;
  public list: Sucursal[] = [];

  constructor(
    public modalService: NgbModal,
    private sucursalService: SucursalesService,
  ) {
    super(modalService);
  }

  ngOnInit() {
    this.sucursalService.get().subscribe(data => {
      this.list = data;
    });
  }

  edit(sucursal: Sucursal, content: any, $index: number) {
    this.item = Object.assign({ save: false }, sucursal);
    this.openModal(content, $index);
  }

  darbaja(sucursal: Sucursal, index: number) {
    this.sucursalService.darbaja(sucursal.sucursal_cod).subscribe(data => {
      this.list[index].estado = data.estado;
    });
  }

  create(content: any) {
    this.item = new Sucursal('', '', 1, '', '', '', true);
    this.openModal(content, -1);
  }

  private openModal(content: any, $index: number) {
    this.open(content, { size: null }).result.then((result => {
      if (this.item.save) {
        this.sucursalService.add({ ...this.item }).subscribe(data => {
          this.list.push({...data});
        });
      } else {
        this.sucursalService.edit({ ...this.item }).subscribe(data => {
          this.list[$index] = data;
        });
      }
    }), (error => { }));
  }
}
