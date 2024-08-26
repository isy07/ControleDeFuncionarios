import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
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
  dataSource = new MatTableDataSource<Funcionario>(this.funcionarios);


  colunas = ['Situacao', 'Nome', 'Sobrenome', 'Departamento', 'Acoes', 'Excluir'];
  statusFilter: 'all' | 'ativo' | 'inativo' = 'all';

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

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

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  carregarFuncionarios(){
    if (this.statusFilter === 'ativo') {
      this.funcionarioService.GetFuncionariosAtivo().subscribe(data => {
        const dados = data.dados;
        dados.map((item:Funcionario) => {
          item.dataCriacao = new Date(item.dataCriacao!).toLocaleDateString('pt-BR')
          item.dataAlteracao = new Date(item.dataAlteracao!).toLocaleDateString('pt-BR')
        })

        this.funcionarios = data.dados;
        this.funcionariosGeral = data.dados;
        this.dataSource.data = dados;

      });
    } else if (this.statusFilter === 'inativo') {
      this.funcionarioService.GetFuncionariosInativo().subscribe(data => {
        const dados = data.dados;
        dados.map((item: Funcionario) => {
          item.dataCriacao = new Date(item.dataCriacao!).toLocaleDateString('pt-BR')
          item.dataAlteracao = new Date(item.dataAlteracao!).toLocaleDateString('pt-BR')
        })

        this.funcionarios = data.dados;
        this.funcionariosGeral = data.dados;
        this.dataSource.data = dados;

      });
    } else {
      this.funcionarioService.GetFuncionarios().subscribe(data => {
        const dados = data.dados;
        dados.map((item) => {
          item.dataCriacao = new Date(item.dataCriacao!).toLocaleDateString('pt-BR')
          item.dataAlteracao = new Date(item.dataAlteracao!).toLocaleDateString('pt-BR')
        })

        this.funcionarios = data.dados;
        this.funcionariosGeral = data.dados;
        this.dataSource.data = dados;

      });
    }
  }

  funcao(): void{
    return
  }
  search(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = target.value.toLowerCase();
    this.dataSource.data = this.funcionariosGeral.filter(funcionario => funcionario.nome.toLowerCase().includes(value));
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
  onStatusChange(status: 'all' | 'ativo' | 'inativo'){
    this.statusFilter = status;
    this.carregarFuncionarios();
  }
}
