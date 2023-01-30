import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../../services/services.module';
import {environment} from '../../../environments/environment';


@Component({
  selector: 'app-statistiques',
  templateUrl: './statistiques.component.html',
  styleUrls: ['./statistiques.component.scss']
})
@Injectable({
  providedIn: 'root'
})
export class StatistiquesComponent implements OnInit {
  constructor(
    private httpClient: HttpClient,
    private apiService: ApiService,
  ) { }

  /**Chiffre d'affaire */
  chiffreAffaireData = [];
  filtreTypeChart = 'jour';
  anneeChiffreAffaire :Number = new Date().getFullYear();

  /**Bénéfice */
  beneficeData = [];
  anneeBenefice :Number = new Date().getFullYear();

  /**Temps moyen réparation */
  reparationMoyen = [];

  ngOnInit(): void {
    this.displayChiffreAffaire();
    this.displayBenefice();
    this.displayMoyenneReparation();
  }

  displayMoyenneReparation(){
    this.apiService.get(environment.base_url + 'depots/reparation-moyen')
      .subscribe(
        (response : any[]) => {
          console.log('response api reparation moyen', response);
          this._reparationMoyen = response;
        },
        error => {
          console.log('Error on reparation moyen', error);
        });
  }

  set _reparationMoyen(response: any[]){
    const tab = [];
    response.forEach(item => {
        item.moyenneFormat = new Date(item.moyenne).toLocaleTimeString("fr-FR");
        tab.push(item);
    });
    this.reparationMoyen = tab;
  }

  displayBenefice(){
    this.apiService.get(environment.base_url + `Factures/benefices?annee=${this.anneeBenefice}`)
      .subscribe(
        (response: any[]) => {
          console.log('benefice', response);
          this.beneficeData = this.responseToData(response);
          console.log(this.beneficeData);

          let canvas = <HTMLCanvasElement>document.getElementById("benefice-chart");
          const ctx = canvas.getContext('2d');
          const chart = new Chart(ctx, {
            type: 'line',
            data: {
              labels: ['January', 'February', 'March', 'April', 'May', 'June'],
              datasets: [
                {
                  label: 'Bar Chart',
                  data: this.beneficeData,
                  backgroundColor: '#ef8157',
                  borderColor: '#ef8157',
                  borderWidth: 1
                }
              ]
            },
            options: {
              responsive: true,
              legend: {
                display: false
              },
              scales: {
                xAxes: [{
                  type: 'time',
                  time: {
                    unit: 'month',
                    min: `${this.anneeBenefice}-01-01 00:00:00`,
                    max: `${this.anneeBenefice}-12-31 00:00:00`,
                  }
                }],
                yAxes: [{
                  ticks: {
                    beginAtZero: true
                  }
                }]
              }
            },
          });
        },
        error => {
          console.log('Error on get benefice', error);
        });
  }

  responseToData(response :any[]){
    const tab = [];
    response.forEach(item => {
      tab.push({
        x: new Date(item._id),
        y: item.total
      });
    });
    return tab;
  }

  changefiltreTypeChart(chartName :String){
    console.log('refresh chart', chartName);
    if(chartName == 'chiffreAffaire')
      this.displayChiffreAffaire();

    if(chartName == 'benefice')
      this.displayBenefice();
  }

  get typeFiltre(){
    return (this.filtreTypeChart == 'jour' ? 'day' : 'month');
  }

  displayChiffreAffaire(){
    this.apiService.get(environment.base_url + `Factures/chiffres/${this.filtreTypeChart}?annee=${this.anneeChiffreAffaire}`)
      .subscribe(
        (response: any[]) => {
          console.log('chiffre d\'affaire', response);
          this.chiffreAffaireData = this.responseToData(response);
          console.log(this.chiffreAffaireData);

          let canvas = <HTMLCanvasElement>document.getElementById("chiffre-affaire-chart");
          const ctx = canvas.getContext('2d');
          const chart = new Chart(ctx, {
            type: 'line',
            data: {
              labels: ['January', 'February', 'March', 'April', 'May', 'June'],
              datasets: [
                {
                  label: 'Bar Chart',
                  data: this.chiffreAffaireData,
                  backgroundColor: '#fbc658',
                  borderColor: '#fbc658',
                  borderWidth: 1
                }
              ]
            },
            options: {
              responsive: true,
              legend: {
                display: false
              },
              scales: {
                xAxes: [{
                  type: 'time',
                  time: {
                    unit: this.typeFiltre,
                    min: `${this.anneeChiffreAffaire}-01-01 00:00:00`,
                    max: `${this.anneeChiffreAffaire}-12-31 00:00:00`,
                  }
                }],
                yAxes: [{
                  ticks: {
                    beginAtZero: true
                  }
                }]
              }
            },
          });
        },
        error => {
          console.log('Error on get chiffre d\'affaire', error);
        });
  }

  

  range(start: number, end: number): number[] {
    return Array.from({length: end - start + 1}, (_, i) => start + i);
  }

}
