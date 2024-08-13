import { Component, OnInit } from '@angular/core';
import { Funcionario } from 'src/app/models/funcionarios';
import { FuncionarioService } from 'src/app/services/funcionario.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  funcionarios: Funcionario[] = [];
  funcionariosGeral: Funcionario[] = [];

  constructor(private funcionarioService: FuncionarioService){ }

  ngOnInit(): void{
    this.funcionarioService.GetFuncionarios().subscribe(data=>{
      console.log(data);
      const dados = data.dados;

      dados.map((item) => {
        item.dataCriacao = new Date(item.dataCriacao!).toLocaleDateString('pt-BR')
        item.dataAlteracao = new Date(item.dataAlteracao!).toLocaleDateString('pt-BR')
      })

      this.funcionarios = data.dados;
      this.funcionariosGeral = data.dados;
    })
  }

  funcao(): void{
    return
  }

  search(event: Event): void{
    const target = event.target as HTMLInputElement;
    const value = target.value.toLowerCase();

    this.funcionarios = this.funcionariosGeral.filter(funcionario =>{
      return funcionario.nome.toLocaleLowerCase().includes(value);
    })
  }

}
