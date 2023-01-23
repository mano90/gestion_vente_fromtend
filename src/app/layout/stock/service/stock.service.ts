import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Stock } from '../../../class/real/stock';
import { environment } from '../../../../environments/environment';
import { Search } from '../../../class/real/search';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class StockService {
    constructor(private http: HttpClient) {}

    listeStocks(): Observable<Stock[]> {
        const url = environment.apiUrl + 'Stock/liste';
        return this.http.get<Stock[]>(url);
    }

    deleteStock(id: number) {
        const url = environment.apiUrl + 'Stock/deleteStock/' + id;
        return this.http.get(url);
    }

    addStock(data: Stock) {
        const url = environment.apiUrl + 'Stock/add';
        return this.http.post(url, data);
    }

    search(search: Search): Observable<Stock[]> {
        const url = environment.apiUrl + 'Stock/search';
        return this.http.post<Stock[]>(url, search);
    }
}
