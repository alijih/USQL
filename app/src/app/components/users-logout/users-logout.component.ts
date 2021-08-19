import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-logout',
  templateUrl: './users-logout.component.html',
  styleUrls: ['./users-logout.component.css']
})
export class UsersLogoutComponent implements OnInit {
  token='';
  constructor(public service: UsersService, private router: Router) { }

  ngOnInit(): void {this.token = localStorage.getItem('token')!;
  
}

desloguearse(){this.chaUser(this.token);}
 chaUser(token:string){
  this.service.chau(token).subscribe(
    (res: any) => {
      if (res.resultado == 0) {
        localStorage.clear();
        localStorage.setItem('resultado', res.resultado);
        this.router.navigate(['/principal']);
      }
    }
  );
}
 


}
