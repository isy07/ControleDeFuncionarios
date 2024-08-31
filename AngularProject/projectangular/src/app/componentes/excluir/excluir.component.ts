import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Funcionario } from 'src/app/models/funcionarios';
import { FuncionarioService } from 'src/app/services/funcionario.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-excluir',
  templateUrl: './excluir.component.html',
  styleUrls: ['./excluir.component.css']
})
export class ExcluirComponent implements OnInit{

  inputData: any;
  funcionario!: Funcionario;

  funcionarios: Funcionario[] = [];
  funcionariosGeral: Funcionario[] = [];

  constructor(
    private funcionarioService: FuncionarioService,
    private router: Router,
    private toastr: ToastrService,
    private notificationService: NotificationService,

    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<ExcluirComponent>
  ){

  }

  ngOnInit(): void{
    this.inputData = this.data;

    this.funcionarioService.GetFuncionarioById(this.inputData.id).subscribe((data)=>{
      this.funcionario = data.dados;
    });
  }


  Excluir(){
    this.funcionarioService.ExcluirFuncionario(this.inputData.id).subscribe((data)=>{
      this.toastr.success('Funcionário excluído com Sucesso!', 'Sucesso');
      this.notificationService.notifyDelete();
      this.ref.close();


    },
    (error) => {
      this.toastr.error('Erro ao excluir funcionário!', 'Erro');
    }
   )
  }

  Cancelar(){
    this.ref.close
  }
}
