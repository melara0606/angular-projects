import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PersonalesService } from './../../../services/personales.service';

@Component({
  selector: 'app-personal-list',
  templateUrl: './personal-list.component.html',
  styles: []
})
export class PersonalListComponent implements OnInit {
  public personales: any[] = [];

  constructor(
    public router: Router,
    private personalesService: PersonalesService
  ) { }

  ngOnInit() {
    this.personalesService.getAll().subscribe(all => this.personales = all);
  }

  editarPersonal(item: any) {
    this.router.navigate(['personales', item.personal_cod]);
  }
}
