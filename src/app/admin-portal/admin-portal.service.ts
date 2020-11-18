import { Product } from './../models/product';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Company } from '../models/company';
import { User } from '../models/user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AdminPortalService {
  // URL to web api
  private companyUrl = 'http://localhost:5000/api/companies';
  private productUrl = 'http://localhost:5000/api/products';
  private userUrl = 'http://localhost:5000/api/users';
  constructor(private http: HttpClient) {}

  getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(this.companyUrl);
  }

  getCompanyById(id: any): Observable<Company> {
    return this.http.get<Company>(`${this.companyUrl}/${id}`);
  }

  addCompany(company: Company): Observable<any> {
    return this.http.post<any>(this.companyUrl, company, httpOptions);
  }

  updateCompanyById(company: Company, id: any): Observable<Company> {
    return this.http.put<Company>(
      `${this.companyUrl}/${id}`,
      company,
      httpOptions
    );
  }

  deleteCompanyById(id: any): Observable<Company> {
    return this.http.delete<Company>(`${this.companyUrl}/${id}`);
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productUrl);
  }

  getProductById(id: any): Observable<Product> {
    return this.http.get<Product>(`${this.productUrl}/${id}`);
  }

  addProduct(product: Product): Observable<any> {
    return this.http.post<any>(this.productUrl, product, httpOptions);
  }

  updateProductById(product: Product, id: any): Observable<Product> {
    return this.http.put<Product>(
      `${this.productUrl}/${id}`,
      product,
      httpOptions
    );
  }

  deleteProductById(id: any): Observable<Product> {
    return this.http.delete<Product>(`${this.productUrl}/${id}`);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl + '/getAllUsers');
  }

  deleteUserById(id: String): Observable<User> {
    return this.http.delete<User>(`${this.userUrl}/${id}`);
  }

  updateUserById(user: User, id: any): Observable<User> {
    console.log('USER OBJECT ' + user);
    return this.http.put<User>(`${this.userUrl}/${id}`, user, httpOptions);
  }
}
