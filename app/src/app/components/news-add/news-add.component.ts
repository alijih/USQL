import { GlobalConstants } from './../../models/apiurl ';
import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NewsService } from 'src/app/services/news.service';
import { CategoriesService } from 'src/app/services/categories.service';
import {Observable}  from 'rxjs';
import * as _ from 'lodash';



@Component({
  selector: 'app-news-add',
  templateUrl: './news-add.component.html',
  styleUrls: ['./news-add.component.css']
})
export class NewsAddComponent implements OnInit {
                      //para foto 
  @ViewChild('fileInput') userPhoto: any;
  carga_completa = false;
    cardImageBase64: any;
    id: any;
    defecto = "";
    datos: any;
    imageUrl: string = "https://bulma.io/images/placeholders/480x480.png";
                          //fin foto
    defecto2 = "";
    card2ImageBase64: any;
    imageUrln: string = "https://bulma.io/images/placeholders/480x480.png";
    datosn: any;



    
    urlapi:string=GlobalConstants.apiurl;


  status='';
  estado=false;
  categories:any;
  rol='';
  erroru = false;
  errorc = false;
  categoriaelegida:any;
  userForm: FormGroup = this.formBuilder.group({
    category:['',Validators.required],
    Title: ['', Validators.required],
    Subtitle: [''],
    report: ['', Validators.required],
    fotoport: ['', Validators.required],
    fotonot: ['', Validators.required],
    videonot: ['', Validators.required],
    portada: ['', Validators.required],
    hide: ['', Validators.required]
  });
  constructor(
    private formBuilder: FormBuilder, 
    public service: NewsService, 
    public servicecat: CategoriesService, 
    private router: Router) { }

  ngOnInit(): void {
    this.userForm.reset();
    this.userForm.patchValue({category:5});
    this.userForm.patchValue({portada:'1'});
    this.userForm.patchValue({hide:'1'});
    this.userForm.patchValue({fotoport:"https://bulma.io/images/placeholders/480x480.png"});
    this.userForm.patchValue({fotonot:'jhf'});
    this.userForm.patchValue({videonot:'jhf'});
    
    this.errorc = false;
    this.status = localStorage.getItem('resultado')!;
    if (parseInt(this.status)==1){  this.estado=true; }
    else{this.router.navigate(['/main']);}
    this.rol = localStorage.getItem('rol')!;
    if (parseInt(this.rol)==1){this.router.navigate(['/mainr']);}

    this.servicecat.list().subscribe(
      (cat: any) => {
        this.categories=cat;
      }
    );
    //this.userForm.get('Title')?.focus();
    
  }
  onSubmit(): void {
    this.errorc = false;
    this.service.clearFormData();
    this.datos = this.imageUrl;
    this.datosn = this.imageUrln;
    if (this.datos == "https://bulma.io/images/placeholders/480x480.png"){ 
      this.datos = ""
    }else{
      this.datos = this.datos.substring(this.datos.indexOf(',')+1);
    }
    if (this.datosn == "https://bulma.io/images/placeholders/480x480.png"){ 
      this.datosn = ""
    }else{
      this.datosn = this.datos.substring(this.datos.indexOf(',')+1);
    }
   
    this.service.formData = {
      id_categoria : this.userForm.value.category,
      titulo  : this.userForm.value.Title,
      subtitulo : this.userForm.value.Subtitle,
      descripcion : this.userForm.value.report,
      foto_portada : this.datos,
      foto_noticia : this.datosn,
      video_noticia : this.userForm.value.videonot,
      portada : this.userForm.value.portada,
      hide : this.userForm.value.hide,
    };
    // this.categoriaelegida = await this.getCategoria(this.userForm.value.category);
    this.insertRecord();
  }

  insertRecord() {

    this.service.postNew(this.service.formData).subscribe(
      res => {
        //MOSTRAR UN MENSAJE QUE SE GUARDO CORRECTAMENTE
        this.router.navigate(['/newslist']);
        this.userForm.reset();
      },
      (err: HttpErrorResponse) => {

        var MensajeError = err.error.message;
        console.log(err);
       console.log(MensajeError);
         console.log('algo malio sal');
            this.userForm.reset();
        
        
        //this.router.navigate(['/usersadd']);
      }

    );
  }

                      //para foto
  onChange(fileInput: any) {
    if (fileInput.target.files && fileInput.target.files[0]) 
    {
        // Size Filter Bytes
        const max_size = 10485760;
        const allowed_types = ['image/png', 'image/jpeg'];
        const max_height = 10000;
        const max_width = 10000;

        if (fileInput.target.files[0].size > max_size) {
            window.alert('Maximum size allowed is ' + (max_size/1024)/1024 + 'Mb');
            this.limpiarFoto()
            return false;
        }else{

              if (!_.includes(allowed_types, fileInput.target.files[0].type)) 
                  {
                      window.alert('Only Images are allowed ( JPG | PNG )');
                      this.limpiarFoto()
                      return false;
                  }else{
                          const reader = new FileReader();
                          reader.onload = (e: any) => 
                            { 
                              const image = new Image();
                              image.src = e.target.result;
                               image.onload = (rs:any) => 
                              {
                                const img_height = rs.currentTarget['height'];
                                const img_width = rs.currentTarget['width'];
                                if (img_height > max_height && img_width > max_width) 
                                  {
                                    window.alert('Maximum dimentions allowed '+max_height+'*'+max_width+'px');
                                    this.limpiarFoto()
                                    return false;
                                  } else {
                                            const imgBase64Path = e.target.result;
                                            this.cardImageBase64 = imgBase64Path;
                                           
                                            this.imageUrl = e.target.result;    
                                            reader.readAsDataURL(fileInput.target.files[0]);                                                                   
                                          return}
                              } ;
                            };
                            reader.readAsDataURL(fileInput.target.files[0]);
                         }
          }
      }
    return}


  //para foto
  onChange2(fileInput2: any) {
    if (fileInput2.target.files && fileInput2.target.files[0]) 
    {
        // Size Filter Bytes
        const max_size = 10485760;
        const allowed_types = ['image/png', 'image/jpeg'];
        const max_height = 600;
        const max_width = 600;

        if (fileInput2.target.files[0].size > max_size) {
            window.alert('Maximum size allowed is ' + (max_size/1024)/1024 + 'Mb');
            this.limpiarFoto()
            return false;
        }else{

              if (!_.includes(allowed_types, fileInput2.target.files[0].type)) 
                  {
                      window.alert('Only Images are allowed ( JPG | PNG )');
                      this.limpiarFoto()
                      return false;
                  }else{
                          const reader = new FileReader();
                          reader.onload = (e: any) => 
                            { 
                              const image = new Image();
                              image.src = e.target.result;
                               image.onload = (rs:any) => 
                              {
                                const img_height = rs.currentTarget['height'];
                                const img_width = rs.currentTarget['width'];
                                if (img_height > max_height && img_width > max_width) 
                                  {
                                    window.alert('Maximum dimentions allowed '+max_height+'*'+max_width+'px');
                                    this.limpiarFoto()
                                    return false;
                                  } else {
                                            const imgBase64Path = e.target.result;
                                            this.card2ImageBase64 = imgBase64Path;
                                            this.imageUrln = e.target.result;    
                                            reader.readAsDataURL(fileInput2.target.files[0]);                                                                   
                                          return}
                              } ;
                            };
                            reader.readAsDataURL(fileInput2.target.files[0]);
                         }
          }
      }
    return}

  limpiarFoto(){
    //this.userPhoto.nativeElement.value = null;
    this.imageUrl = "https://bulma.io/images/placeholders/480x480.png";
  }
  limpiarFoto2(){
    //this.userPhoto.nativeElement.value = null;
    this.imageUrln = "https://bulma.io/images/placeholders/480x480.png";
  }
                  //fin foto





              //foto para enviar pero lo puedo borrar
  actualizar(){
    this.datos = this.imageUrl;
    if (this.datos == "https://bulma.io/images/placeholders/480x480.png" || this.datos=="https://localhost:44389"+this.defecto){ 
      this.datos = ""
    }else{
      console.log('llegue aca');
      this.datos = this.datos.substring(this.datos.indexOf(',')+1);
    }
    const enviar = {
      foto: this.datos,
    };
      //ENVIO LOS DATOS DE LA IMAGEN AL SERVICIO
    // this.LG.editarUser(enviar).subscribe(data => {
    //   if(data.estado){
    //     this.subiendo = true;
    //     window.location.reload();
    //   }
    //   else{
    //     this.subiendo = true;
    //     window.alert(data.reporte);
    //     console.log(data.error);
    //   }
    // });
  }
}
