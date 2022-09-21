import { Component, Inject, OnInit } from '@angular/core';

import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ApiService } from '../Services/api.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'
interface Sexo {
  value: string;
  viewValue: string;
}
interface Obrigatorio {
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
      DS_CAMPO: ['', Validators.required],
      NRO_ORDENACAO: ['', Validators.required],
      SEXO: ['', Validators.required],
      IN_OBRIGATORIO: ['', Validators.required],
      CHAVE1: ['', Validators.required],
      CHAVE2: ['', Validators.required],
      TIPO: ['', Validators.required],
      LIMITE: ['', Validators.required],
      TIPO2: ['', Validators.required],
      LIMITE2: ['', Validators.required],
      OPCOES: ['', Validators.required],
    });
    if(this.editDados){
      this.acaoBtn = "Atualizar";
      this.produtoForm.controls['DS_CAMPO'].setValue(this.editDados.DS_CAMPO);
      this.produtoForm.controls['NRO_ORDENACAO'].setValue(this.editDados.NRO_ORDENACAO);
      this.produtoForm.controls['SEXO'].setValue(this.editDados.SEXO);
      this.produtoForm.controls['IN_OBRIGATORIO'].setValue(this.editDados.IN_OBRIGATORIO);
      this.produtoForm.controls['CHAVE1'].setValue(this.editDados.CHAVE1);
      this.produtoForm.controls['CHAVE2'].setValue(this.editDados.CHAVE2);
      this.produtoForm.controls['TIPO'].setValue(this.editDados.TIPO);
      this.produtoForm.controls['LIMITE'].setValue(this.editDados.LIMITE);
      this.produtoForm.controls['TIPO2'].setValue(this.editDados.TIPO2);
      this.produtoForm.controls['LIMITE2'].setValue(this.editDados.LIMITE2);
      this.produtoForm.controls['OPCOES'].setValue(this.editDados.OPCOES);

    }
  }
  sexos: Sexo[] = [
    {value: 'Masculino', viewValue: 'Masculino'},
    {value: 'Feminino', viewValue: 'Feminino'},
    {value: 'Sem gênero', viewValue: 'Sem gênero'},
  ];

  obrigatorios: Obrigatorio[] = [
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
