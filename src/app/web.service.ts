import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './Product';
import { Observable } from 'rxjs';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';


@Injectable({
  providedIn: 'root'
})
export class WebService {

  baseUrl = "http://localhost:8080/api/produtos";

  constructor(private http: HttpClient) { 

  }


  getProducts():Observable <Product[]> {
    return this.http.get<Product[]>(this.baseUrl);
  }

  registerProduct(product: Product): Observable<any>{
    let body = new HttpParams();
    body = body.set('title', product.title);
    body = body.set('description', product.description);
    body = body.set('price', String(product.price));
    return this.http.post(this.baseUrl, body, { observe: "response"});
  }

  updateProduct(product: Product): Observable <any> {
    let body = new HttpParams();
    body = body.set('title', product.title);
    body = body.set('description', product.description);
    body = body.set('price', String(product.price));
    return this.http.put(this.baseUrl + "/" + product._id, body, { observe: "response"});
  }

  
  deleteProduct(product: Product): Observable <any> {
    return this.http.delete(this.baseUrl + "/" + product._id, { observe: "response"});
  }


}
