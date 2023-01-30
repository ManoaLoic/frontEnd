import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { type } from 'os';

export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    type: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/reparer-voiture',     title: 'Réparer ma voiture',icon:'nc-ambulance',       class: 'reparer-bar' , type:'c'},
    { path: '/mes-voitures',        title: 'Mes voitures',      icon:'nc-bus-front-12',    class: '' , type:'c' },
    { path: '/depots',              title: 'Liste dépots',      icon:'nc-bus-front-12',    class: '' , type:'ra rf' },
    { path: '/depots',              title: 'Mes dépots',      icon:'nc-bus-front-12',    class: '' , type:'c' },
    { path: '/mes-factures',                title: 'Mes factures',      icon:'nc-bank',            class: '' , type:'c' },
    { path: '/statistiques',        title: 'Statistiques',      icon:'nc-chart-bar-32',    class: '' , type:'rf' },
    { path: '/depenses',            title: 'Depenses',          icon:'nc-paper',         class: '' , type:'rf' },
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];

    constructor(
        private router: Router,
    ){

    }

    ngOnInit() {
        const userJSON = localStorage.getItem('me');
        if(!userJSON){
            this.router.navigate(['/login']);
        }
        const user = JSON.parse(userJSON);
        const userType = user?.userType;
        if(userType == '63d6e19a6f427cc3ec7e0640'){
            this.menuItems = ROUTES.filter(menuItem => {
                return menuItem.type.includes('c');
            });
        }else if(userType == '63d6e20a6f427cc3ec7e0644'){
            this.menuItems = ROUTES.filter(menuItem => {
                return menuItem.type.includes('rf');
            });
        }else if(userType == '63d6e1ff6f427cc3ec7e0642'){
            this.menuItems = ROUTES.filter(menuItem => {
                return menuItem.type.includes('ra');
            });
        }
    }
}
