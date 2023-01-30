import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  base_url = 'https://oval-ablaze-birth.glitch.me/'

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  private getToken(): string {
    return localStorage.getItem('jwt');
  }

  put(uri :string, body :any): Observable<any>{
    const headers = new HttpHeaders({ 'x-auth-token': '' + this.getToken() });
    return this.http.put(uri, body, { headers })
      .pipe(catchError(error => this.handleError(error)));
  }

  post(uri :string, body :any): Observable<any>{
    const headers = new HttpHeaders({ 'x-auth-token': '' + this.getToken() });
    return this.http.post(uri, body, { headers })
      .pipe(catchError(error => this.handleError(error)));
  }

  get(uri: string): Observable<any> {
    const headers = new HttpHeaders({ 'x-auth-token': '' + this.getToken() });
    return this.http.get(uri, { headers })
      .pipe(catchError(error => this.handleError(error)));
  }

  register(user: any): Observable<any> {
    return this.http.post(`${this.base_url}users`, user)
      .pipe(catchError(this.handleError));
  }

  login(user: any): Observable<any> {
    return this.http.post(`${this.base_url}api/auth`, user)
      .pipe(catchError(this.handleError));
  }

  getProtectedData(): Observable<any> {
    const headers = new HttpHeaders({ 'x-auth-token': '' + this.getToken() });
    return this.http.get(`${this.base_url}reparer-voiture`, { headers })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let self = this;
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      switch (error.status) {
        case 401:
          self.router.navigate(['/depots']);
          console.error('Unauthorized');
          break;
        case 403:
          self.router.navigate(['/login']);
          console.error('Forbidden');
          break;
        default:
          console.error(`Backend returned code ${error.status}, body was: `, error.error);
      }
    }
    return throwError('Something bad happened; please try again later.');
  }
}
