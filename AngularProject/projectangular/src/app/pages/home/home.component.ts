import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ExcluirComponent } from 'src/app/componentes/excluir/excluir.component';
import { Funcionario } from 'src/app/models/funcionarios';
import { FuncionarioService } from 'src/app/services/funcionario.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  funcionarios: Funcionario[] = [];
  funcionariosGeral: Funcionario[] = [];

  colunas = ['Situacao', 'Nome', 'Sobrenome', 'Departamento', 'Acoes', 'Excluir'];

  constructor(private funcionarioService: FuncionarioService,
              public dialog: MatDialog,
              private notificationService: NotificationService
  ){ }

  ngOnInit(): void{

    this.carregarFuncionarios();

    this.notificationService.delete$.subscribe(() => {
      this.carregarFuncionarios();
    });


  }

  carregarFuncionarios(){
    this.funcionarioService.GetFuncionarios().subscribe(data=>{
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

  OpenDialog(id: number){
    this.dialog.open(ExcluirComponent, {
      width: '450px',
      height:'450px',
      data: {
        id: id
      }
    });
  }
}
