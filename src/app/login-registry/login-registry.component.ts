import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/services.module';
import { Router } from '@angular/router';

@Component({ 
  selector: 'app-login-registry',
  templateUrl: './login-registry.component.html',
  styleUrls: ['./login-registry.component.scss', '../../assets/Login-assets/css/main.css', '../../assets/Login-assets/css/util.css']
})
export class LoginRegistryComponent implements OnInit {

  user = {
    email:'jessica@gmail.com',
    password: 'Jessica1234'
  };

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.apiService.login(this.user)
      .subscribe(res => {
        localStorage.setItem('jwt', res.token);
        localStorage.setItem('me', JSON.stringify(res.user));
        this.router.navigate(['/depots']);
      }, err => {
        console.error(err);
      });
    }
}
