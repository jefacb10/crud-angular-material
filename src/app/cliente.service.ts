import { Injectable } from '@angular/core';
import { Cliente } from './cadastro/cliente';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  static readonly REPO_CLIENTES = '_CLIENTES';
  constructor() { }

  salvar(cliente: Cliente) {
    const clientes = this.obterStorage();
    clientes.push(cliente);
    localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(clientes));
  }

  pesquisarCliente(): Cliente[] {
    return this.obterStorage();
  }

  private obterStorage(): Cliente[] {
    const clientesJson = localStorage.getItem(ClienteService.REPO_CLIENTES);
    if(clientesJson) {
      return JSON.parse(clientesJson);
    }
    const clientes: Cliente[] = [];
    localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(clientes));
    return clientes;
  }
  
}
