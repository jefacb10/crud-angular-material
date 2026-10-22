import { Component, OnInit, inject } from '@angular/core';
import { ClienteService } from '../cliente.service';
import { Cliente } from '../cadastro/cliente';
import {FormsModule} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-consulta',
  standalone: true,
  imports: [
    FormsModule,
    MatInputModule, 
    FlexLayoutModule, 
    MatButtonModule,
    MatTableModule, 
    MatIconModule, 
    MatCardModule,
    CommonModule
  ],
  templateUrl: './consulta.component.html',
  styleUrl: './consulta.component.scss'
})
export class ConsultaComponent implements OnInit {

  nomeBusca: string = '';
  listaClientes: Cliente[] = [];
  colunasTable: string[] = ['id', 'nome', 'cpf', 'dataNascimento', 'email', 'acoes'];
  deletando: boolean = false;
  snackbar = inject(MatSnackBar);

  constructor(
    private clienteService: ClienteService, 
    private router: Router) { 
  }


  ngOnInit(){
    this.listaClientes = this.clienteService.pesquisarCliente('');
  }


  pesquisar(nomeBusca: string): Cliente[]{
     this.listaClientes = this.clienteService.pesquisarCliente(nomeBusca);
     return this.listaClientes;
  }

  editar(id: string): void {
    console.log('Editar cliente:', id);
    this.router.navigate(['/cadastro'], { queryParams: { "id": id } });
  }

  excluir(cliente: Cliente): void {
    this.clienteService.deletar(cliente);
    this.listaClientes = this.clienteService.pesquisarCliente(this.nomeBusca);
    this.snackbar.open('Cliente excluído com sucesso!', 'Fechar', { duration: 5000 });''
  }

  prepararExclusao(cliente: Cliente): void {
    cliente.deletando = true;
  }

}
