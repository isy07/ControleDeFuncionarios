import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Funcionario } from 'src/app/models/funcionarios';
import { FuncionarioService } from 'src/app/services/funcionario.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

  btnAcao: string = 'Editar';
  btnTitulo: string = 'Editar Funcionário';
  funcionario!: Funcionario;

  constructor(
    private funcionarioService: FuncionarioService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService){

  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.funcionarioService.GetFuncionarioById(id).subscribe(
      (data)=>{
        this.funcionario = data.dados;
      })

  }

  editarFuncionario(funcionario: Funcionario){
    this.funcionarioService.UpdateFuncionario(funcionario).subscribe(
      (data) => {
        if (data.sucesso) {
        this.router.navigate(['/']);
         this.toastr.success('Funcionário editado com sucesso!', 'Sucesso');
      } else {
        this.toastr.error(data.mensagem, 'Erro');
      }
    },
      (error) => {
         this.toastr.error('Erro ao editar funcionário!', 'Erro');
      }
    )
  }
}
