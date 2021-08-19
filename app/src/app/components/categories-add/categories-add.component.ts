import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';


@Component({
  selector: 'app-categories-add',
  templateUrl: './categories-add.component.html',
  styleUrls: ['./categories-add.component.css']
})
export class CategoriesAddComponent implements OnInit {
  status='';
  estado=false;
  rol='';
  errorc = false;

  userForm: FormGroup = this.formBuilder.group({
    nombre:['',Validators.required],
    portada: ['', Validators.required],
    hide: ['', Validators.required]
  });
  constructor(private formBuilder: FormBuilder, public service: CategoriesService, private router: Router) { }

  ngOnInit(): void {
    this.userForm.reset();
    this.userForm.patchValue({portada:'1'});
    this.userForm.patchValue({hide:'1'});

    
    this.errorc = false;

    this.status = localStorage.getItem('resultado')!;
    if (parseInt(this.status)==1){  this.estado=true; }
    else{this.router.navigate(['/main']);}
    this.rol = localStorage.getItem('rol')!;
    if (parseInt(this.rol)==1){this.router.navigate(['/mainr']);}
    
  }
  onSubmit(): void {
    this.errorc = false;
    this.service.clearFormData();
    this.service.formData = {
      nombre : this.userForm.value.nombre,
      portada : this.userForm.value.portada,
      hide : this.userForm.value.hide,
    };
    this.insertRecord();
  }

  insertRecord() {
    this.service.addCategory(this.service.formData).subscribe(
      res => {
        //MOSTRAR UN MENSAJE QUE SE GUARDO CORRECTAMENTE
        this.router.navigate(['/categorieslist']);
        this.userForm.reset();
      },
      (err: HttpErrorResponse) => {
        console.log(err);
        var MensajeError = err.error.message;
       console.log(MensajeError);
       if (MensajeError == "CATEGORIA YA EXISTE") {
        this.errorc = true;
      } else {
        console.log('algo malio sal');
        this.userForm.reset();
      }
      }

    );
  }

}