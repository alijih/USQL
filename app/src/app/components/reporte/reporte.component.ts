import { GlobalConstants } from './../../models/apiurl ';
import { NewsService } from 'src/app/services/news.service';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit {
  apiurl:string=GlobalConstants.parafoto;
  id_reporte="";
  status='';
  rol='';
  oculto=false;
  estado=false;
  reporte:any;
  arraytemporal:any;
  noticia:any;
  constructor(public service: NewsService, public servicecat: CategoriesService,private router: Router, private _route: ActivatedRoute, private location: Location) { }

  ngOnInit(): void {
    this.oculto=false;
    this.status = localStorage.getItem('resultado')!;
      if (parseInt(this.status)==1){
        this.estado=true;
              }else{this.estado=false}
    
      this.id_reporte = this._route.snapshot.paramMap.get('rep_id')!;//id noticia

      this.service.acceder(this.id_reporte).subscribe(
        (res: any) => {
          this.reporte=res;
          if(this.reporte.foto_portada!=""){
            this.reporte.foto_portada=this.apiurl+"/images/News/"+this.reporte.id_noticia+"/portada.png";
          }else{ this.reporte.foto_portada="../../../assets/LOGO.png";}
          if(this.reporte.foto_noticia!=""){
            this.reporte.foto_noticia=this.apiurl+"/images/News/"+this.reporte.id_noticia+"/noticia.png";
          }
            this.arraytemporal=this.reporte.date.split("T");
            this.reporte.date=this.arraytemporal[0];
            if(this.reporte.hide==0){
              this.oculto=true;                
            }
          }
      );
      
      if(this.estado!) 
      {
        if(this.oculto){
          this.router.navigate(['/main']);                 
        }
      }
  }
  goback(){this.location.back();}
}
