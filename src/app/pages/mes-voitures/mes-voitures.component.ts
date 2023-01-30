import { Component, OnInit } from '@angular/core';
import { NgModel, NgForm, NgModelGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from "ngx-toastr";
import { NgbModalOptions , NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../services/services.module';
import { Router } from '@angular/router';

import {environment} from '../../../environments/environment';

const initVoiture = {
  "marque" : "",
  "model" : "",
  "immatriculation" : ""
};

@Component({
  selector: 'app-mes-voitures',
  templateUrl: './mes-voitures.component.html',
  styleUrls: ['./mes-voitures.component.scss']
})

@Injectable({
  providedIn: 'root'
})

export class MesVoituresComponent implements OnInit {
  newVehicule = {...initVoiture};
  vehicules: any = [];
  reparations: any = [];
  modalOptions: NgbModalOptions;

  constructor(
    private httpClient: HttpClient,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private apiService: ApiService,
    private router: Router,
  ) { 
    this.modalOptions = {
      centered: true,
      backdrop: false
    };
  }

  ngOnInit(): void {
    this.getVoitures();
  }

  openModal(content) {
    this.modalService.open(content, this.modalOptions).result.then(
			(result) => {
        if(result == 'Save click'){
          console.log('newVehicule', this.newVehicule);
          this.ajouterVoiture();
        }
			},
			(reason) => {
				console.log('close reason', reason);
			},
		);
  }

  finishAction(str){
    // this.resetFormulaire();
    this.toastr.success(
      '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">'+ str +'</span>',
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

  ajouterVoiture(){
    this.apiService.post(environment.base_url + 'voitures/ajout-voiture', this.newVehicule)
      .subscribe(
        response => {
          console.log('response api ajout-voiture', response);
          this.finishAction('Voiture ajouté avec succès');
          this.getVoitures();
          this.newVehicule = {...initVoiture};
        },
        error => {
          console.log('Error on ajout-voiture', error);
        });
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

  getReparations(idVoiture :String){
    this.apiService.get(environment.base_url + 'depots/listeReparation?idVoiture='+idVoiture)
      .subscribe(
        response => {
          console.log('response api ajout-depot', response);
          this.reparations = response;
        },
        error => {
          console.log('Error on ajout-depot', error);
        });
  }

}
