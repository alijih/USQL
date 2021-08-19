import { Component, OnInit,ViewChild } from '@angular/core';
import { GlobalConstants } from './../../models/apiurl ';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { NewsService } from 'src/app/services/news.service';
import { CategoriesService } from 'src/app/services/categories.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-news-edit',
  templateUrl: './news-edit.component.html',
  styleUrls: ['./news-edit.component.css']
})
export class NewsEditComponent implements OnInit {
  @ViewChild('fileInput') userPhoto: any;
  imageUrl: string = "https://bulma.io/images/placeholders/480x480.png";
  urlapi:string=GlobalConstants.apiurl;
                          //fin foto
  cardImageBase64: any;
  datos: any;
  status='';
  estado=false;
  categories:any;
  categoriaactual:any;
  rol='';
  new_id = "";
  erroru = false;
  errorc = false;
  categoriaelegida:any;


  userForm: FormGroup = this.formBuilder.group({
    category:['',Validators.required],
    Title: ['', Validators.required],
    Subtitle: [''],
    report: ['', Validators.required],
    fotoport: [''],
    fotonot: [''],
    videonot: [''],
    portada: ['', Validators.required],
    hide: ['', Validators.required]
  });
  constructor(
    private formBuilder: FormBuilder, 
    public service: NewsService, 
    public servicecat: CategoriesService, 
    private _route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.userForm.reset();
    this.errorc = false;
    this.status = localStorage.getItem('resultado')!;
    if (parseInt(this.status)==1){  this.estado=true; }
    else{this.router.navigate(['/main']);}
    this.rol = localStorage.getItem('rol')!;
    if (parseInt(this.rol)==1){this.router.navigate(['/mainr']);}
    
    this.new_id = this._route.snapshot.paramMap.get('new_id')!;
// valores

    this.service.acceder(this.new_id).subscribe(
      (noticia: any) => {

        if (noticia.portada=='0'){
          this.userForm.patchValue({portada:'0'});
        }else{
          this.userForm.patchValue({portada:'1'});
        }
        if (noticia.hide=='0'){
          this.userForm.patchValue({hide:'0'});
        }else{
          this.userForm.patchValue({hide:'1'});
        }
            
        this.userForm.patchValue({Title: noticia.titulo});  
        this.userForm.patchValue({Subtitle: noticia.subtitulo}); 
        this.userForm.patchValue({report: noticia.descripcion}); 
        this.userForm.patchValue({fotoport: noticia.foto_portada}); 
        this.userForm.patchValue({fotonot: noticia.foto_noticia}); 
        this.userForm.patchValue({videonot: noticia.video_noticia}); 
        this.userForm.patchValue({category: noticia.id_categoria}); 
      }

    );
    this.servicecat.list().subscribe(
      (cat: any) => {
        this.categories=cat;
      }
    );


    
  }
  onSubmit(): void {
    this.errorc = false;
    this.service.clearFormData();
    this.datos = this.imageUrl;
    if (this.datos == "https://bulma.io/images/placeholders/480x480.png"){ 
        this.datos = ""
    }else{
      this.datos = this.datos.substring(this.datos.indexOf(',')+1);
    }

    this.service.formData = {
      id_categoria : this.userForm.value.category,
      titulo  : this.userForm.value.Title,
      subtitulo : this.userForm.value.Subtitle,
      descripcion : this.userForm.value.report,
      foto_portada : this.userForm.value.fotoport,
      foto_noticia : this.datos,
      video_noticia : this.userForm.value.videonot,
      portada : this.userForm.value.portada,
      hide : this.userForm.value.hide,
    };
    // this.categoriaelegida = await this.getCategoria(this.userForm.value.category);
    this.insertRecord();
  }

  


  insertRecord() {
    this.service.editNew(this.service.formData, this.new_id).subscribe(
      res => {
        //MOSTRAR UN MENSAJE QUE SE GUARDO CORRECTAMENTE
        this.router.navigate(['/newslist']);
        this.userForm.reset();
      },
      (err: HttpErrorResponse) => {

        var MensajeError = err.error.ModelState.Error;
        console.log(err);
       console.log(MensajeError);
         console.log('algo malio sal');
            this.userForm.reset();
        
        
        //this.router.navigate(['/usersadd']);
      }

    );
  }
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
    limpiarFoto(){
      //this.userPhoto.nativeElement.value = null;
      this.imageUrl = "https://bulma.io/images/placeholders/480x480.png";
    }
}
