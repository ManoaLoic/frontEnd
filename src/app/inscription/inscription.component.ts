import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/services.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss', '../../assets/Login-assets/css/main.css', '../../assets/Login-assets/css/util.css']
})
export class InscriptionComponent implements OnInit {

  user = {
    name: '',
    email: '',
    password: ''
  };

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
  }

  register(){
    this.apiService.register(this.user)
    .subscribe(
      res => {
        console.log(res);
        console.log(this.router.url);
      this.router.navigate(['/login']);
      },
      err => console.log(err)
    );
  }

}
