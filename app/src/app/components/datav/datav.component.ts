import { FotosaddComponent } from './../datavisual/fotosadd/fotosadd.component';
import { PhotosService } from './../../services/photos.service';
import { VideosService } from './../../services/videos.service';
import { Component, OnInit, Input  } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';

import {CargarjvService} from '../../services/cargarjv.service';
import { GlobalConstants } from 'src/app/models/apiurl ';


@Component({
  selector: 'app-datav',
  templateUrl: './datav.component.html',
  styleUrls: ['./datav.component.css']
})
export class DatavComponent implements OnInit {

  ruta:any;
  ids = "/repp/";
   urlarmada="";
  arraytemporal:any;
  apiurl:string=GlobalConstants.parafoto;
  resultadotemporal:Array<{
    url:string;
    hide:number;
    titulo:string;
    id_foto:number;
    direccion:string;

    }>=[];
    Fotos:any;
    todaslasnews:any;
    news:any;
    videos:any;

  status='';
  estado=false;
  constructor(public service: PhotosService,
    public _service: VideosService, 
    private router: Router,
    private _route: ActivatedRoute,
    private cargaJS:CargarjvService) {cargaJS.CargaScript(['carru.js']);}

  ngOnInit(): void {
    
    this.status = localStorage.getItem('resultado')!;
      if (parseInt(this.status)==1){
        this.estado=true;
      }

      if(this.estado){
           this._service.list().subscribe(
             (res:any) =>{
              this.videos=res;
              console.log(this.videos);
             }
             )
            this.service.GetFotos().subscribe(
                (id: any) => {
                     this.Fotos=id;
                    for(let i=0;i<this.Fotos.length ;i++){
                         this.Fotos[i].url=this.apiurl+"/images/Photos/"+this.Fotos[i].id_foto+".png";  
                         this.Fotos[i].direccion=this.ids+ this.Fotos[i].id_foto;                                
                         }

                  });
           
      }else{
         this._service.listNR().subscribe(
           (res:any) =>{
             this.videos=res;
             console.log(this.videos);
           })

        this.service.GetFotosNR().subscribe(
          (id: any) => {
            this.Fotos=id;
            for(let i=0;i<this.Fotos.length ;i++){
                 this.Fotos[i].url=this.apiurl+"/images/Photos/"+this.Fotos[i].id_foto+".png"; 
                 this.Fotos[i].direccion=this.ids+ this.Fotos[i].id_foto;                                       
                 }
          });
      }
  }
}
