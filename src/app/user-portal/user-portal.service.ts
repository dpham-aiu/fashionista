import { Purchase } from './../models/purchase';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class UserPortalService {
  private itemUrl = 'http://localhost:5000/api/items';
  constructor(private http: HttpClient) {}

  addItem(purchase: Purchase): Observable<any> {
    return this.http.post<any>(this.itemUrl, purchase, httpOptions);
  }
}
