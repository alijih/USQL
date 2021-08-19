import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-main-reg',
  templateUrl: './main-reg.component.html',
  styleUrls: ['./main-reg.component.css']
})
export class MainRegComponent implements OnInit {
  status='';
  estado=false;
  rol='';
  
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.status = localStorage.getItem('resultado')!;
    if (parseInt(this.status)==1){  this.estado=true; }
    else{this.router.navigate(['/main']);}
    this.rol = localStorage.getItem('rol')!;
    //if (parseInt(this.rol)==0){}else{};
}

}
