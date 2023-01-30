import { Component, OnInit } from '@angular/core';
import { NgModel, NgForm, NgModelGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from "ngx-toastr";
import { ApiService } from '../../services/services.module';

import {environment} from '../../../environments/environment';

const initDepot = {
  "voitureId":"",
  "Description":"",
  "date_depot":"",
  "pieces": []
};

@Component({
  selector: 'app-ajout-depot',
  templateUrl: './ajout-depot.component.html',
  styleUrls: ['./ajout-depot.component.scss']
})
@Injectable({
  providedIn: 'root'
})

export class AjoutDepotComponent implements OnInit {
  vehicules: any[] = [];

  depot:any = initDepot;

  constructor(
    private httpClient: HttpClient,
    private toastr: ToastrService,
    private apiService: ApiService,
  ) { 
  }

  ngOnInit(): void {
    this.getVoitures();
  }

  getVoitures() {
    this.apiService.get(environment.base_url + 'voitures/getVoitures')
      .subscribe(res => {
        console.log('response api ajout-depot', res);
        this.vehicules = res;
      }, err => {
        console.log('Error on ajout-depot', err);
      });
  }

  valider(){
    console.log('Depot', this.depot);

    /**Create depot */
    this.apiService.post(environment.base_url + 'depots/ajoutDepot', this.depot)
      .subscribe(
        response => {
          console.log('response api ajout-depot', response);
          this.finishAction();
        },
        error => {
          console.log('Error on ajout-depot', error);
        });

  }

  finishAction(){
    this.resetFormulaire();
    this.toastr.success(
      '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Nous avons bien reçu votre demande de dépot de voiture, merci de votre patience</span>',
      "",
      {
        timeOut: 4000,
        closeButton: true,
        enableHtml: true,
        toastClass: "alert alert-success alert-with-icon",
        positionClass: "toast-top-center"
      }
    );
  }

  resetFormulaire(){
    Object.keys(initDepot).forEach(key => {
      if(key == "pieces") this.depot[key] = []; 
      else this.depot[key] = '';
    });
  }

  choosefiles(event){
    console.log('event', event.target.files);
    const filesArray:any[] = Array.from(event.target.files);
    const reader = new FileReader();
    if(filesArray.length > 0){
      filesArray.forEach(file => {
        reader.readAsDataURL(file);
    
        reader.onload = () => {
          const result = reader.result as string;
          // console.log('img', result);
          this.depot.pieces.push({
            "content": result,
            "name": file.name,
          });
        };
      });
    }
  }

}
