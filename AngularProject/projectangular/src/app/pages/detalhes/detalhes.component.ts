import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Funcionario } from 'src/app/models/funcionarios';
import { FuncionarioService } from 'src/app/services/funcionario.service';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.css']
})
export class DetalhesComponent implements OnInit {

  funcionario?: Funcionario;
  id! : number;


  constructor(
    private funcionarioService: FuncionarioService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService){

  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.funcionarioService.GetFuncionarioById(this.id).subscribe(
      (data)=>{
        const dados = data.dados;
          dados.dataCriacao = new Date(dados.dataCriacao!).toLocaleDateString('pt-BR')
          dados.dataAlteracao = new Date(dados.dataAlteracao!).toLocaleDateString('pt-BR')
        this.funcionario = data.dados;
      })
  }


  InativaFuncionario(){
    this.funcionarioService.InativaFuncionario(this.id).subscribe(
      (data) => {
        this.router.navigate(['/']);
        if (this.funcionario?.ativo){
          this.toastr.success('Funcionário inativado com Sucesso!', 'Sucesso');
        }else{
          this.toastr.success('Funcionário ativado com Sucesso!', 'Sucesso');
        }
      },
      (error) => {
        this.toastr.error('Erro ao cadastrar funcionário!', 'Erro');
      }
    )
  }
}
