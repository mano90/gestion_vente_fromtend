import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Stock } from '../../../class/real/stock';
import { environment } from '../../../../environments/environment';
import { Search } from '../../../class/real/search';
import { Observable } from 'rxjs';
import { ShortProduit } from '../../../class/real/short-produit';

@Injectable({
    providedIn: 'root'
})
export class PerimeService {
    constructor(private http: HttpClient) {}

    listeStocks(): Observable<Stock[]> {
        const url = environment.apiUrl + 'Stock/listePerime';
        return this.http.get<Stock[]>(url);
    }

    deleteStock(id: number) {
        const url = environment.apiUrl + 'Stock/deletePerime/' + id;
        return this.http.get(url);
    }

    listeShortReference(): Observable<ShortProduit[]> {
        const url = environment.apiUrl + 'Produit/getReference';
        return this.http.get<ShortProduit[]>(url);
    }

    search(search: Search): Observable<Stock[]> {
        const url = environment.apiUrl + 'Stock/searchPerime';
        return this.http.post<Stock[]>(url, search);
    }
    deleteStockTrue(id: number) {
        const url = environment.apiUrl + 'Stock/deleteStock/' + id;
        return this.http.get(url);
    }
}
