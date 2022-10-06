import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { ModalComponent } from './modal/modal.component';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  displayedColumns: string[] = ['Produto','Tipo_do_produto', 'Valor', 'Itens_Acompanhantes', 'Equipe', 'ACOES'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialogo: MatDialog) {}


  openDialog() {
    const dialogRef = this.dialogo.open(ModalComponent, {
      width: '30%'
    })
  }
}
