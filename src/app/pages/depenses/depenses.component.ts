import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgbModalOptions , NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from "ngx-toastr";
import { ApiService } from '../../services/services.module';

import {environment} from '../../../environments/environment';

const defaultDepense = {
  "type" : "Depense",
  "raison" : "salaire",
  "montant" : 0,
  "remarque" : "",
  "date_paiement" : new Date().toISOString().substring(0, 10)
};

@Component({
  selector: 'app-depenses',
  templateUrl: './depenses.component.html',
  styleUrls: ['./depenses.component.scss']
})
@Injectable({
  providedIn: 'root'
})
export class DepensesComponent implements OnInit {
  itemDepense = {...defaultDepense};
  depenses : any[] = [];
  modalOptions: NgbModalOptions;

  constructor(
    private httpClient: HttpClient,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private apiService: ApiService,
  ) { 
    this.modalOptions = {
      centered: true,
      backdrop: false
    };
  }
  

  ngOnInit(): void {
    this.getListeDepenses();
  }

  openModal(content) {
    this.modalService.open(content, this.modalOptions).result.then(
			(result) => {
        if(result == 'Save click'){
          console.log('montant', this.itemDepense);
          this.ajouterDepense()
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

  ajouterDepense(){
    this.apiService.post(environment.base_url + 'factures/depenses', this.itemDepense)
      .subscribe(
        response => {
          console.log('response api ajout-depense', response);
          this.finishAction('Depense ajouté avec succès');
          this.getListeDepenses();
          this.itemDepense = {...defaultDepense};
        },
        error => {
          console.log('Error on ajout-depense', error);
        });
  }

  getListeDepenses(){
    this.apiService.get(environment.base_url + 'factures/depenses')
      .subscribe(
        (response :any) => {
          console.log('depenses', response);
          this.depenses = response;
        },
        error => {
          console.log('Error on get depenses', error);
        });
  }

}
