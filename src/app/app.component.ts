import { Component } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http'
import { Observable, of, catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontRecargass';
  private httHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http:HttpClient){

  }

  recarga={lineaRecargada:'',valorRecarga:'',idOperador:'',idVendedor:''}
 
  registrarRecarga(): void{

    console.log(this.recarga)
    this.enviarPeticion(this.recarga).subscribe(
      response=>{
        this.recarga={lineaRecargada:'',valorRecarga:'',idOperador:'',idVendedor:'' }
        console.log(response)
        alert("Recarga Registrada")
      },err=>{
        console.log(err)
        alert("Error al registrar la Recarga")
      }
    )

      }


  enviarPeticion(recarga:any):Observable<any> {
      return this.http.post<any>('http://localhost:8080/api/recarga', recarga, { headers: this.httHeaders }).pipe(
      catchError((e)=>{
        if(e.status==400){
          return throwError(e);
        }
        return throwError(e);
      })
    ) 
  }

}
