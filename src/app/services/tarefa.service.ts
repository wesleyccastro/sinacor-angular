import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {

  baseUri = 'https://localhost:7150/api/Tarefa';
  constructor(private http: HttpClient) { }

  get(): Observable<any>{
    return this.http.get(`${this.baseUri}`)
  }

  post(tarefa: any): Observable<any>{
    return this.http.post(`${this.baseUri}`, tarefa)
  }  

  delete(id: number): Observable<any>{
    return this.http.delete(`${this.baseUri}/${id}`)
  }

  getById(id: number): Observable<any>{
    return this.http.get(`${this.baseUri}/${id}`)
  }

}
