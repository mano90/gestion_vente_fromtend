import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Produit } from './../../../class/real/produit';
import { environment } from '../../../../environments/environment';
import { Stock } from '../../../class/real/stock';
import { ShortProduit } from '../../../class/real/short-produit';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProduitService {
    constructor(private http: HttpClient) {}

    listeProduits(): Observable<Produit[]> {
        const url = environment.apiUrl + 'Produit/liste';
        return this.http.get<Produit[]>(url);
    }
    deleteProduit(reference: string) {
        const url = environment.apiUrl + 'Produit/deleteProduit/' + reference;
        return this.http.get(url);
    }

    addProduit(data: Produit) {
        const url = environment.apiUrl + 'Produit/add';
        return this.http.post(url, data);
    }
    updateProduit(data: Produit) {
        const url = environment.apiUrl + 'Produit/update';
        return this.http.post(url, data);
    }

    addStock(data: Stock) {
        const url = environment.apiUrl + 'Stock/add';
        return this.http.post(url, data);
    }

    listeShortReference(): Observable<ShortProduit[]> {
        const url = environment.apiUrl + 'Produit/getReference';
        return this.http.get<ShortProduit[]>(url);
    }

    getItem(reference: string) {
        const url = environment.apiUrl + 'Produit/getItem/' + reference;
        return this.http.get(url);
    }

    uploadFile(file: File | null): Observable<string> {
        const url = environment.apiUrl + 'Produit/uploadFile';
        const formdata: FormData = new FormData();
        formdata.append('uploadedImage', file!);
        return this.http.post<string>(url, formdata);
    }

    deleteFile(path: string): any {
        const url = environment.apiUrl + 'Produit/deleteFile/' + path;
        return this.http.get(url);
    }
}
