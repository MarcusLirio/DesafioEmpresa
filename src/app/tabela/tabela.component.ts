import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ApiService } from '../Services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {ModalComponent} from '../modal/modal.component'
import {MatDialog} from '@angular/material/dialog';
@Component({
  selector: 'tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.css']
})
export class TabelaComponent implements OnInit {

  constructor(private api: ApiService,public dialogo: MatDialog) { }
  @Input() displayedColumns: string[] = [];
  @Input() dataSource!: MatTableDataSource<any>;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.getTodosDados();
  }

  getTodosDados(){
    this.api.getDados()
    .subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error:(err)=>{
        console.log("error")
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deletarDados(id:number){
    this.api.deletarDados(id)
    .subscribe({
      next: (res)=>{
        alert("Exclusão com sucesso!")
      },
      error:()=>{
        alert("Falha na exclusão")
      }
    })
  }

  editDados(row: any){
    this.dialogo.open(ModalComponent,{
      width:'30%',
      data:row
    })
  }



}
