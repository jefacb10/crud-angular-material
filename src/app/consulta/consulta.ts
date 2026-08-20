import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input'; 
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ClienteService } from '../cliente.service';
import { Cliente } from '../cadastro/cliente';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-consulta',
  imports: [
    MatCardModule,
    FlexLayoutModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    FormsModule,
    MatPaginatorModule
  ],
  templateUrl: './consulta.html',
  styleUrl: './consulta.scss',
})
export class ConsultaComponent implements OnInit {
  clientes: Cliente[] = [];
  dataSource: MatTableDataSource<Cliente>;
  displayedColumns: any;
  constructor(private clienteService: ClienteService) {
    this.dataSource = new MatTableDataSource<Cliente>();
  }

  ngOnInit() {
    this.clientes = this.clienteService.pesquisarCliente();
  }

}

