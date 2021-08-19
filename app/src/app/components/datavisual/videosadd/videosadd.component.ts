import { DomSanitizer } from '@angular/platform-browser';
import { VideosService } from './../../../services/videos.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { GlobalConstants } from 'src/app/models/apiurl ';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import * as _ from 'lodash';


//import { CargarjvService } from 'src/app/services/cargarjv.service';






@Component({
  selector: 'app-videosadd',
  templateUrl: './videosadd.component.html',
  styleUrls: ['./videosadd.component.css']
})
export class VideosaddComponent implements OnInit {
  error=false;
  status='';
  rol='';
  estado=false;
  imageUrl: string = "";
  urlapi:string=GlobalConstants.apiurl;
  datos:any;


  public archivos:any=[];
  loading!:boolean;



  photoForm: FormGroup=this.formBuilder.group({
    hide:['', Validators.required],
    url:['',Validators.required],
    titulo:['',Validators.required]
  });

  constructor(private formBuilder: FormBuilder,
    private http: HttpClient,
    public service: VideosService,private router: Router,
    private sanitizer: DomSanitizer) {  }

  ngOnInit(): void {
    this.loading=false;
    this.photoForm.reset();
    this.photoForm.patchValue({hide:'1'});
    this.error=false;
     
    this.status = localStorage.getItem('resultado')!;
    if (parseInt(this.status)==1){  this.estado=true; }
    else{this.router.navigate(['/main']);}
    this.rol = localStorage.getItem('rol')!;
    if (parseInt(this.rol)==1){this.router.navigate(['/mainr']);}
  }

  onSubmit(){
     this.error=false;
     this.service.clearFormData();
     this.loading=true;
     this.datos = this.imageUrl;
     if (this.datos != ""){ 
       this.datos = this.datos.substring(this.datos.indexOf(',')+1);
     }
      console.log(this.datos);
     this.service.formData = {
       url : this.photoForm.value.url,
       hide  : this.photoForm.value.hide,
       titulo : this.photoForm.value.titulo
       };
     this.insertRecord();
  }

  insertRecord() {  
    console.log(this.service.formData);
    this.service.PostVideos(this.service.formData).subscribe(
      res => {
        this.loading=false;
        //MOSTRAR UN MENSAJE QUE SE GUARDO CORRECTAMENTE
        this.router.navigate(['/vidlist']);
        this.photoForm.reset();
      },
      (err: HttpErrorResponse) => {
        this.loading=false;
        var MensajeError = err.error.message;
        console.log(err);
       console.log(MensajeError);
         console.log('algo malio sal');
            this.photoForm.reset();
        
        
        //this.router.navigate(['/usersadd']);
      }

    );
  }
  //para foto
  onChange(event:any):any {
    const max_size = 10485760;
    const archivoCapturado=event.target.files[0];
    const allowed_types = ['video/mp4'];

    if (archivoCapturado.size > max_size) {
      window.alert('Maximum size allowed is ' + (max_size/1024)/1024 + 'Mb');
      this.limpiarFoto()
      return false;
      }else{
        if (!_.includes(allowed_types, archivoCapturado.type)) 
          {
                 window.alert('Only Video are allowed ( MP4 )');
                  this.limpiarFoto()
                 return false;
           }else{
                       this.extraerBase64(archivoCapturado).then((imagen:any) =>{   
       
                         this.imageUrl=imagen.base;
                            
                        })

                 } ;
         };
 }


    extraerBase64=async($event:any)=>new Promise((resolve, rejec)=>{
      try{
        const unsafeImg=window.URL.createObjectURL($event);
        const image =this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
        const reader = new FileReader();
        reader.readAsDataURL($event);
        reader.onload=()=>{
          resolve({
            base: reader.result
          });
        }
          reader.onerror =error =>{
            resolve({
              base:null

            });
          };return
          
        } catch(e){
          return null;
        }
      })






    

    limpiarFoto(){
      this.photoForm.patchValue({url:''})
      this.imageUrl = "";
    }

}






























      // NO LA PROBE PERO TBN ES PARA EXTRAER LA BASE64

      
    //   convertToBase64(url: string) {
    //     this.http.get(url, { responseType: "blob" }).subscribe(blob => {
    //       const reader = new FileReader();
    //       const binaryString = reader.readAsDataURL(blob);
    //       reader.onload = (event: any) => {
    //         //Here you can do whatever you want with the base64 String
    //         console.log("File in Base64: ", event.target.result);
    //       };
    
    //       reader.onerror = (event: any) => {
    //         console.log("File could not be read: " + event.target.error.code);
    //       };
    //     });
    // }