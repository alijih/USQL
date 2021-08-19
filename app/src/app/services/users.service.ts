import { GlobalConstants } from './../models/apiurl ';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';




@Injectable({
  providedIn: 'root'
})
export class UsersService {
  oRes = '';
  //user_id='';
  direccion: string= GlobalConstants.apiurl ;
  readonly rootURL=this.direccion;

   formData: User = new User;
  constructor(private http: HttpClient) {}
  
  DeleteUser(user_id: string){
    return this.http.delete(this.rootURL + '/Users/DelUser/'+user_id);
  }
  postUsuario(formData: User) {
    return this.http.post(this.rootURL + '/Users/register', formData);
  }
  postUser(formData: User) {
    return this.http.post(this.rootURL + '/Users/adduser', formData);
  }
  editUser(formData:User, user_id: string){
    return this.http.post(this.rootURL + '/Users/edit/'+ user_id, formData);
  }
  login(formData: User) {
    return this.http.post(this.rootURL + '/Acceso/Login', formData);
  }
  acceder(user_id: string) {
    return this.http.get(this.rootURL + '/Users/GetUsuario/' + user_id)
  }
  activate(user_id: string) {
    return this.http.get(this.rootURL + '/Users/Act/' + user_id)
  }
  deactivate(user_id: string) {
    return this.http.get(this.rootURL + '/Users/Dst/' + user_id)
  }
  changepswd(user_id: string, oldpwd:string, newpwd:string) {
    return this.http.get(this.rootURL + '/Users/Changepswd/' + user_id +'/'+ oldpwd + '/' + newpwd)
  }

  chau(token: string) {
    return this.http.get(this.rootURL + '/Acceso/Logout?token=' + token)
  }
  listar() {
    return this.http.get(this.rootURL + '/Users/GetUsuario')
  }
  clearFormData() {
    this.formData = {
      nickname: "",
      nombre: "",
      apellido: "",
      password: "",
      user_foto: "img/profile.png",
      active: true,
      token: "",
      email: "",
      rol: 1,
      user_descripcion: ""
    };
  }
}