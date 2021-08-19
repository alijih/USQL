import { GlobalConstants } from './../models/apiurl ';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { New } from '../models/new.model';
import { Busqueda} from '../models/search.model';
import {estadologuin} from '../models/estado.model';


@Injectable({
  providedIn: 'root'
})
export class NewsService {
  oRes = '';
  //new_id='';
  formData: New = new New;
  // Busq: Busqueda= new Busqueda;
  EstLog: estadologuin = new estadologuin;
  direccion: string= GlobalConstants.apiurl ;
  readonly rootURL=this.direccion;
  constructor(private http: HttpClient) { }

  DeleteNew(new_id: string){
    return this.http.delete(this.rootURL + '/Noticias/DeleteNoticia/'+new_id);
  }
  postNew(formData: New) {
    return this.http.post(this.rootURL + '/Noticias/register', formData);
  }

  editNew(formData:New, new_id: string){
    return this.http.post(this.rootURL + '/Noticias/edit/'+ new_id, formData);
  }

  acceder(new_id: string) {
    return this.http.get(this.rootURL + '/Noticias/GetNoticia/' + new_id)
  }
  GetLatest() {
    return this.http.get(this.rootURL + '/Noticias/GetLatest')
  }
  GetPortada() {
    return this.http.get(this.rootURL + '/Noticias/GetPortada')
  }
  GetPortadaR() {
    return this.http.get(this.rootURL + '/Noticias/GetPortada')
  }
  GetLatestR() {
    return this.http.get(this.rootURL + '/Noticias/GetLatestR')
  }
  GetNoticiaPolicy(){
    return this.http.get(this.rootURL + '/Noticias/GetNoticiaPolicy')
  }
  GetNoticiaPolicyR(){
    return this.http.get(this.rootURL + '/Noticias/GetNoticiaPolicyR')
  }
  noticiaSearchNR(){
    return this.http.get(this.rootURL + '/Noticias/noticiaSearchNR')
  }
  GetNoticiaLiteracy(){
    return this.http.get(this.rootURL + '/Noticias/GetNoticiaLiteracy')
  }
  GetNoticiaLiteracyR(){
    return this.http.get(this.rootURL + '/Noticias/GetNoticiaLiteracyR')
  }
  listar() {
    return this.http.get(this.rootURL + '/Noticias/GetNoticia')
  }
  // busq(Busq:Busqueda){
  //   return this.http.post(this.rootURL + '/Noticias/busq', Busq);
  // }
  clearFormData() {
    this.formData = {
      id_categoria : 1,
      titulo  : "",
      subtitulo : "",
      descripcion : "",
      foto_portada : "/img/profile.png",
      foto_noticia : "",
      video_noticia : "",
      portada : 1,
      hide : 1,
    };
  }
}