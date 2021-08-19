import { GlobalConstants } from './../../models/apiurl ';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
//import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { NewsService } from 'src/app/services/news.service';
import { CategoriesService } from 'src/app/services/categories.service';



@Component({
  selector: 'app-latest',
  templateUrl: './latest.component.html',
  styleUrls: ['./latest.component.css']
})
export class LatestComponent implements OnInit {
  //idnoticiaportada="";
  status='';     
  estado=false;    
  categorialatest:any;
  noticiasportadas:any;
  apiurl:string=GlobalConstants.parafoto;
  rol='';
  id_latest = "";
  errorlatest = false;
  arraytemporal:any;
  noticialatest:any;
  ids:any;
  ids_portada=[];
  Noticia= {
    category:'',
    Title: '',
    Subtitle: '',
    report: '',
    fotoport: '',
    fotonot: '',
    videonot: '',
    date:''
  };

  constructor(
    public service: NewsService, 
    public servicecat: CategoriesService, 
    private _route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.errorlatest = false;
    this.status = localStorage.getItem('resultado')!;
    if (parseInt(this.status)==1){  this.estado=true; }
    else{this.router.navigate(['/main']);}

    this.rol = localStorage.getItem('rol')!;
    if (parseInt(this.rol)==1){this.router.navigate(['/mainr']);}
    
    

    if(this.estado==false){
      this.service.GetLatest().subscribe(
        (id: any) => {
          this.noticialatest=id;   
          this.Noticia.Title = this.noticialatest.titulo;  
          this.Noticia.Subtitle=this.noticialatest.subtitulo; 
          this.Noticia.report= this.noticialatest.descripcion; 

          if(this.noticialatest.foto_portada!=""){  
            this.Noticia.fotoport=this.apiurl+"/images/News/"+this.noticialatest.id_noticia+"/portada.png";
          }else{ this.Noticia.fotoport="../../../assets/LOGO.png";}

          this.Noticia.fotonot= this.noticialatest.foto_noticia; 
          this.Noticia.videonot= this.noticialatest.video_noticia; 
          this.id_latest="/rep/"+this.noticialatest.id_noticia;
          this.servicecat.view(this.noticialatest.id_categoria).subscribe(
            (Categoria:any)=>{
              this.Noticia.category =Categoria.nombre;
            });
          }
        );
        this.service.GetPortada().subscribe(
          (id: any) => {
            this.noticiasportadas=id;
            for(let i=0;i<this.noticiasportadas.length ;i++){
              this.arraytemporal=this.noticiasportadas[0].date.split("T");
              this.noticiasportadas[i].date=this.arraytemporal[0];
            }
          }
          );
      
      }
     else{this.service.GetLatestR().subscribe(
        (id: any) => {
          this.noticialatest=id;

          this.Noticia.Title = this.noticialatest.titulo;  
          this.Noticia.Subtitle=this.noticialatest.subtitulo; 
          this.Noticia.report= this.noticialatest.descripcion; 
          if(this.noticialatest.foto_portada!=""){
            this.Noticia.fotoport=this.apiurl+"/images/News/"+this.noticialatest.id_noticia+"/portada.png";
          } else{ this.Noticia.fotoport="../../../assets/LOGO.png";}
          this.Noticia.fotonot= this.noticialatest.foto_noticia; 
          this.Noticia.videonot= this.noticialatest.video_noticia; 
          this.id_latest="/rep/"+this.noticialatest.id_noticia;
          this.servicecat.view(this.noticialatest.id_categoria).subscribe(
            (Categoria:any)=>{
              this.Noticia.category =Categoria.nombre;
            });
            
            });
            this.service.GetPortadaR().subscribe(
              (id: any) => {
                this.noticiasportadas=id;
                for(let i=0;i<this.noticiasportadas.length ;i++){
                  this.arraytemporal=this.noticiasportadas[0].date.split("T");
                
                  this.noticiasportadas[i].date=this.arraytemporal[0];
                }
              }
              );
              console.log(this.id_latest)
          }
      

          
        
        
       


    
   
  }
  onSubmit(): void {
    };
    // this.categoriaelegida = await this.getCategoria(this.userForm.value.category);

}
