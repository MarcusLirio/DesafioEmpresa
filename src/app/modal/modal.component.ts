import { Component, Inject, OnInit } from '@angular/core';

import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ApiService } from '../Services/api.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'
interface Celular {
  value: string;
  viewValue: string;
}
interface Equipes {
  invalue: string;
  inviewValue: string;
}
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  produtoForm !: FormGroup ;
  acaoBtn: string = "Salvar";
  constructor(private formBuilder : FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editDados: any,
     private api: ApiService,
      private dialogRef: MatDialogRef<ModalComponent> ) { }

  ngOnInit(): void {
    this.produtoForm = this.formBuilder.group({
      Produto: ['', Validators.required],
      Valor: ['', Validators.required],
      Itens_Acompanhantes: ['', Validators.required],
      Tipo_do_produto: ['', Validators.required],
      Equipe: ['', Validators.required],
    });
    if(this.editDados){
      this.acaoBtn = "Atualizar";
      this.produtoForm.controls['Produto'].setValue(this.editDados.Produto);
      this.produtoForm.controls['Valor'].setValue(this.editDados.Valor);
      this.produtoForm.controls['Tipo_do_produto'].setValue(this.editDados.Valor);
      this.produtoForm.controls['Itens_Acompanhantes'].setValue(this.editDados.Itens_Acompanhantes);
      this.produtoForm.controls['Equipe'].setValue(this.editDados.Equipe);

    }
  }
  celular: Celular[] = [
    {value: 'Samsung', viewValue: 'Samsung'},
    {value: 'Apple', viewValue: 'Apple'},
    {value: 'Asus', viewValue: 'Asus'},
  ];

  equipe: Equipes[] = [
    {invalue: 'Sim', inviewValue: 'Sim'},
    {invalue: 'Não', inviewValue: 'Não'},
  ];

 
  salvar() {
    if(!this.editDados){
      if(this.produtoForm.valid){
        this.api.postDados(this.produtoForm.value)
        .subscribe({
          next:(res)=>{
            alert("Dado adicionado com sucesso");
            this.produtoForm.reset();
            this.dialogRef.close('save');
          },
          error:()=>{
            alert("Erro ao adicionar dado");
  
          }
        })
      }
    }
    else{
        this.updateDados();
    }
  }
  updateDados(){
    this.api.atualizarDados(this.produtoForm.value, this.editDados.id)
    .subscribe({
      next: (res)=>{
        alert("Foi atualizado!!");
        this.produtoForm.reset();
        this.dialogRef.close('Atualizar');
      }, error:()=>{
        alert("Não foi possivel atualizar");
        this.dialogRef.close('Atualizar');
      }
    })
  }
}
