import { Injectable } from '@angular/core';
import { Cliente } from './cadastro/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  static REPO_CLIENTES = "_CLIENTES";

  constructor() { }

  salvar(cliente: Cliente){
    const storage = this.obterStorage();
    storage.push(cliente);

    localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(storage));
  }

  atualizar(cliente: Cliente){
    const storage = this.obterStorage();
    storage.forEach((c) => {
      if(c.id === cliente.id){
        Object.assign(c, cliente);
      }
    });
    localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(storage));
  }

  pesquisarCliente(nome: string): Cliente[] {
    const storage = this.obterStorage();

    if(!nome){
      return storage;
    }

    return storage.filter(cliente => cliente.nome?.indexOf(nome) !== -1);
  }

  obterClientePorId(id: string): Cliente | undefined {
    const storage = this.obterStorage();
    return storage.find(cliente => cliente.id === id);
  }

  obterStorage() : Cliente[] {
    const repositorioClientes = localStorage.getItem(ClienteService.REPO_CLIENTES);
    if(repositorioClientes){
      const clientes: Cliente[] = JSON.parse(repositorioClientes);
      return clientes;
    }
    
    const clientes: Cliente[] = [];
    localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(clientes));
    return clientes;
  }

  deletar(cliente: Cliente){
    const storage = this.obterStorage();
    const index = storage.findIndex(c => c.id === cliente.id);
    if (index !== -1) {
      storage.splice(index, 1);
      localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(storage));
    }
  }

}
