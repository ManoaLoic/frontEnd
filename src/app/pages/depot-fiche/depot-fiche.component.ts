import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgModel, NgForm, NgModelGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from "ngx-toastr";
import { NgbModalOptions , NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../services/services.module';

import {environment} from '../../../environments/environment';

const initItemReparation = {
  "nom" : "",
  "montant" : 0,
  "status": "A faire",
};

@Component({
  selector: 'app-depot-fiche',
  templateUrl: './depot-fiche.component.html',
  styleUrls: ['./depot-fiche.component.scss'],
})
@Injectable({
  providedIn: 'root'
})
export class DepotFicheComponent implements OnInit {
  id: string;
  depot :any = {};
  images : String[] = [];
  user :any = {};

  /**Liste réparation */
  modeEditReparation :Boolean = false;
  itemReparation:any = {...initItemReparation};
  ListeReparation: any[] = [];

  /**Paiement */
  modalOptions: NgbModalOptions;
  montantPaiement :Number = 0;
  paiements: any = [];
  Facture: any = {
    "net_a_payer" : 0,
    "reste" : 0
  };

  /**Gestion entré/sortie */
  date_recuperation = new Date().toISOString().substr(0, 16);

  constructor(
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private apiService: ApiService,
  ) { 
    this.modalOptions = {
      centered: true,
      backdrop: false
    };
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getRecord();
    this.getFacture();
  }

  get canSortie(){
    return !(this.depot.status == 'En attente de récupération' && this.paye);
  }

  get attenteRecup(){
    return this.depot.status == 'En attente de récupération' && !this.depot.date_recuperation;
  }

  get attenteRecup2(){
    return this.depot.status == 'En attente de récupération' && this.depot.date_recuperation;
  }

  renseignerDate(){
    this.updateDepot({"date_recuperation": new Date(this.date_recuperation)}, 'Nous vous attendons avec impatience');
  }

  get texteEntreeSortie(){
    if(!this.depot.date_remise){
      return 1;
    }else if(!this.depot.date_sortie){
      return 2;
    }else{
      return 3;
    }
  }

  entreeSortie(type){
    this.apiService.put(environment.base_url + `depots/vehicule/${type}/${this.id}`, {})
      .subscribe(
        response => {
          console.log('response api entree/sortie', response);
          const msg = (type == 'sortie') ? 'Voiture récupéré' : 'Voiture réceptionné';
          this.finishAction('<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">'+ msg +'</span>');
          this._depot = response;
          this.getFacture();
        },
        error => {
          console.log('Error on entree/sortie', error);
        });
  }

  getImage(name){
    this.apiService.get(environment.base_url + 'depots/piece?nom=' + encodeURIComponent(name))
      .subscribe(
        (response :any) => {
          console.log('image', response.image);
          this.images.push(response.image);
        },
        error => {
          console.log('Error on get image', error);
        });
  }

  decisionClient(decision :String){
    const newItem = {
      "status": decision,
    }
    this.apiService.put(environment.base_url + 'depots/decision-client/'+this.depot._id, newItem)
      .subscribe(
        response => {
          console.log('response api ajout-depot', response);
          this.finishAction('<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Dépot validé avec succès</span>');
          this._depot = response;
          this.getFacture();
        },
        error => {
          console.log('Error on ajout-depot', error);
        });
  }

  get userName(){
    return (this.depot.user) ? this.depot.user.name : '--';
  }

  get voiture(){
    return (this.depot.voiture) ? `${this.depot.voiture.marque} ${this.depot.voiture.model} ${this.depot.voiture.immatriculation}` : '--';
  }

  get paye(){
    return (this.Facture.net_a_payer > 0 && this.Facture.reste == 0);
  }

  get canValidate(){
    return !((this.depot.status == 'En attente de devis' && this.ListeReparation?.length > 0) ? true : false);
  }

  get ajouterPaiement(){
    return this.Facture.reste == 0;
  }

  get canAddReparation(){
    return this.depot.status != 'En attente de devis';
  }

  openModal(content) {
    this.modalService.open(content, this.modalOptions).result.then(
			(result) => {
        if(result == 'Save click'){
          console.log('montant', this.montantPaiement);
          this.effectuerPaiement();
        }
			},
			(reason) => {
				console.log('close reason', reason);
			},
		);
  }

  set _facture(facture){
    this.Facture = facture;
    if(facture.paiements) this.paiements = facture.paiements;
    this.montantPaiement = this.Facture.reste;
  }

  effectuerPaiement(){
    const newItem = {
      "montant": this.montantPaiement,
    }
    this.apiService.put(environment.base_url + 'factures/payer/'+this.Facture._id, newItem)
      .subscribe(
        response => {
          console.log('response api ajout-depot', response);
          this.finishAction('<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Paiement effectué avec succès</span>');
          this._facture = response;
        },
        error => {
          console.log('Error on ajout-depot', error);
        });
  }

  getFacture(){
    this.apiService.get(environment.base_url + 'factures/' + this.id)
      .subscribe(
        (response: any[]) => {
          console.log('Liste paiements', response);
          if(response.length > 0){
            this._facture = response[0];
          }
        },
        error => {
          console.log('Error on get depot by id', error);
        });
  }

  ajouter(){
    console.log('reparation', this.itemReparation);
    if(!this.ListeReparation) this.ListeReparation = [];
    this.ListeReparation.unshift(this.itemReparation);
    this.itemReparation = {...initItemReparation};
  }

  supprimer(index){
    console.log('index', index);
    this.ListeReparation.splice(index, 1);
  }

  validerListeReparation(){
    if(confirm("Valider la liste de réparation ? ")) {
      this.updateDepot({"status" : "Devis envoyé"}, 'Liste réparation validé avec succès');
    }
  }

  enregistrerReparation(){
    this.updateDepot({"ListeReparation":this.ListeReparation}, 'Liste de réparation mis à jour');
  }

  updateDepot(item, toast){
    this.apiService.put(environment.base_url + 'depots/'+this.id, item)
      .subscribe(
        response => {
          this._depot = response;
          console.log('response api ajout-depot', response);
          this.finishAction(`<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">${toast}</span>`);
        },
        error => {
          console.log('Error on ajout-depot', error);
        });
  }

  finishAction(msg){
    this.modeEditReparation = false;
    this.toastr.success(msg,"",{
        timeOut: 4000,
        closeButton: true,
        enableHtml: true,
        toastClass: "alert alert-success alert-with-icon",
        positionClass: "toast-top-center"
      }
    );
  }

  getRecord(){
    this.apiService.get(environment.base_url + 'depots/' + this.id)
      .subscribe(
        response => {
          console.log('response api get depot by id', response);
          this.user = response.user;
          this._depot = response.data;
          if(this.depot?.pieces?.length > 0){
            this.depot.pieces.forEach(item => {
                this.getImage(item);
            });
          }
        },
        error => {
          console.log('Error on get depot by id', error);
        });
  }

  effectuerRep(index){
    if(confirm("Voullez vous mettre cette ligne en fait ? ")) {
      this.ListeReparation[index].status = "Fait";
      this.updateDepot({"ListeReparation":this.ListeReparation}, 'Reparation effectuée');
    }
    
  }

  set _depot(response){
    this.depot = response;
    this.ListeReparation = this.depot.ListeReparation;
  }

  modifierReparation(){
    this.modeEditReparation = true;
  }

  annulerModifReparation(){
    this.modeEditReparation = false;
  }

}
