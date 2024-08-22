import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Funcionario } from 'src/app/models/funcionarios';
import { FuncionarioService } from 'src/app/services/funcionario.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {

  btnAcao = "Cadastrar"
  btnTitulo = "Cadastrar Funcionário"

  constructor(
    private funcionarioService: FuncionarioService,
    private router: Router,
    private toastr: ToastrService,
  ){

  }

  createFuncionario(funcionario: Funcionario){
    this.funcionarioService.CreateFuncionario(funcionario).subscribe(
      (data) => {
        this.router.navigate(['/'])
        this.toastr.success('Funcionário cadastrado com Sucesso!', 'Sucesso');
      },
      (error) => {
        this.toastr.error('Erro ao cadastrar funcionário!', 'Erro');
      }
    )

  }

}
