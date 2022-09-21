import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { ModalComponent } from './modal/modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(public dialogo: MatDialog) {}

  ngOnInit(): void
  {
  }
  openDialog() {
    const dialogRef = this.dialogo.open(ModalComponent, {
      width: '30%'
    })
  }

}
