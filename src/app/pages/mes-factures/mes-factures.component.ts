import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import { Router } from '@angular/router';
import { ApiService } from '../../services/services.module';

@Component({
  selector: 'app-mes-factures',
  templateUrl: './mes-factures.component.html',
  styleUrls: ['./mes-factures.component.scss']
})
@Injectable({
  providedIn: 'root'
})
export class MesFacturesComponent implements OnInit {
  depots:any = [];

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private apiService: ApiService,
    ) { }

  ngOnInit(): void {
    this.getDepots();
  }

  redirectToFiche(id){
    console.log(id);
    this.router.navigate([`/depot`, id]);
  }

  getDepots(){
    this.apiService.get(environment.base_url + 'factures')
      .subscribe(
        response => {
          console.log('response api ajout-depot', response);
          this.depots = response;
        },
        error => {
          console.log('Error on ajout-depot', error);
        });
  }

}
