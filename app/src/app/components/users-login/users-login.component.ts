import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-users-login',
  templateUrl: './users-login.component.html',
  styleUrls: ['./users-login.component.css']
})
export class UsersLoginComponent implements OnInit {
  error = false;
  mensaje = '';
  constructor(public service: UsersService, private router: Router) { }

  ngOnInit(): void {
    this.resetForm();
  }
  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.service.formData = {
      nombre: '',
      apellido: '',
      nickname: '',
      email: '',
      password: '',
      rol: 1,
      active: false,
      token: '',
      user_foto: '',
      user_descripcion: '',
    };
  }
  onSubmit(form: NgForm) {
    this.service.login(form.value).subscribe(

      (res: any) => {
        this.error = false;
        if (res.resultado == 1) {
          localStorage.setItem('token', res.datos['token']);
          localStorage.setItem('user_id', res.datos['user_id']);
          localStorage.setItem('rol', res.datos['rol']);
          localStorage.setItem('nickname', res.datos['nicname']);
          localStorage.setItem('imgperfil', res.datos['imgperfil']);
          localStorage.setItem('resultado', res.resultado);
          if(res.datos['rol']==1){
          this.router.navigate(['/main']);
          }
           else{
           this.router.navigate(['/panela']);
           }
        }
        else {
          if (res.resultado == 0) {
            localStorage.setItem('resultado', res.resultado);
            this.mensaje = res.mensaje;
            this.error = true;
          }

        }
      }   
    );
  }

}
