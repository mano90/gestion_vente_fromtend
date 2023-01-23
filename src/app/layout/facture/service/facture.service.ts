import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ThemeService } from 'ng2-charts';
import { Observable } from 'rxjs';
import { PanierItem } from '../../../class/real/panier-item';
import { ShortFacture } from '../../../class/real/short-facture';
import { environment } from '../../../../environments/environment';
import { AchatClientProduit } from '../../../class/real/AchatClientProduit';

@Injectable({
    providedIn: 'root'
})
export class FactureService {
    constructor(private http: HttpClient) {}

    listeFacture(): Observable<ShortFacture[]> {
        const url = environment.apiUrl + 'Achat/liste';
        return this.http.get<ShortFacture[]>(url);
    }
    getListeAChat(date: Date, id: number): Observable<AchatClientProduit[]> {
        const url = environment.apiUrl + 'Achat/getFacture';
        const data = {
            date: date,
            id: id
        };
        return this.http.post<AchatClientProduit[]>(url, data);
    }
}
