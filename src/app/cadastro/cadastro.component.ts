import { Component, OnInit, inject } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout'
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { FormsModule } from '@angular/forms'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { Cliente } from './cliente'
import { ClienteService } from '../cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DadosRegiaoService } from '../dados-regiao.service';
import { Estado, Municipio } from '../dados-regiao.model';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-cadastro',
  imports: [
    FlexLayoutModule,
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    NgxMaskDirective,
    MatSelectModule,
    NgFor
],
  providers: [provideNgxMask()],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent implements OnInit {

  cliente: Cliente = Cliente.newCliente();
  atualizar: boolean = false;
  private snackbar = inject(MatSnackBar);
  estados: Estado[] = [];
  municipios: Municipio[] = [];
  
  constructor(
    private clienteService: ClienteService,
    private dadosRegiaoService: DadosRegiaoService,
    private route: ActivatedRoute,
    private router: Router) {

  }
  ngOnInit() {
    this.route.queryParamMap.subscribe((query: any) => {
      this.buscarEstados();
      const params = query['params'];
      const id = params['id'];
      console.log('ID do cliente para edição:', id);
      if (id) {
        let clienteEncontrado = this.clienteService.obterClientePorId(id);
        if (clienteEncontrado) {
          this.atualizar = true;
          this.cliente = clienteEncontrado;
          if (this.cliente.estado) {
            this.buscarMunicipios({ value: this.cliente.estado } as MatSelectChange);
          }
        }
      }
    });
  }

  buscarEstados() {
    this.dadosRegiaoService.obterEstados().subscribe({
      next : listaEstados => this.estados = listaEstados,
      error: erro => {
        console.error('Erro ao obter estados:', erro);
      }

    });
  }

  buscarMunicipios(event: MatSelectChange) {
    const estado = event.value;
    if (estado) {
      this.dadosRegiaoService.obterMunicipiosPorEstado(estado).subscribe((municipios) => {
        console.log('Municipios obtidos:', municipios);
        this.municipios = municipios;
      });
    }
  }

  salvar(){
    if (!this.cliente.nome || !this.cliente.email || !this.cliente.cpf || !this.cliente.dataNascimento) {
      this.snackbar.open('Por favor, preencha todos os campos obrigatórios.', 'Fechar', { duration: 5000 });
      return;
    }
    else {
      if (this.atualizar) {
        this.clienteService.atualizar(this.cliente);
        this.snackbar.open('Cliente atualizado com sucesso!', 'Fechar', { duration: 5000 });
        this.router.navigate(['/consulta']);
      }
      else {
        this.clienteService.salvar(this.cliente);
        this.cliente = Cliente.newCliente();
        this.snackbar.open('Cliente cadastrado com sucesso!', 'Fechar', { duration: 5000 });
      }
    }
  }
}
