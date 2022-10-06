import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {}

  postDados(data:any){
    return this.http.post<any>("http://localhost:3000/dados/", data);
  }

  getDados(){
    return this.http.get<any>("http://localhost:3000/dados");
  }
  atualizarDados(data:any, id:number){
    return this.http.put<any>("http://localhost:3000/dados/"+ id, data);
  }
  deletarDados(id:number){
    return this.http.delete<any>("http://localhost:3000/dados/"+ id);
  }
}
