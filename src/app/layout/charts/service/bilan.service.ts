import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChartItem } from '../../../class/real/chart-item';
import { environment } from '../../../../environments/environment';
import { Custom } from '../../../class/real/custom';

@Injectable({
    providedIn: 'root'
})
export class BilanService {
    constructor(private http: HttpClient) {}

    recette(annee?: number): Observable<number[]> {
        let url: string;
        if (annee) {
            url = environment.apiUrl + 'Bilan/recette/' + annee;
        } else {
            url = environment.apiUrl + 'Bilan/recette';
        }
        return this.http.get<number[]>(url);
    }

    sortProductsByMostSell(): Observable<ChartItem[]> {
        const url = environment.apiUrl + 'Bilan/sortProductsByMostSell';
        return this.http.get<ChartItem[]>(url);
    }

    sortProductsByMostSellWithDates(dateDebut: string, dateFin: string): Observable<ChartItem[]> {
        const url = environment.apiUrl + 'Bilan/sortProductsByMostSellWithDates';
        const data = {
            dateDebut: dateDebut,
            dateFin: dateFin
        };
        return this.http.post<ChartItem[]>(url, data);
    }

    sellProductsByMonths(annee?: number): Observable<Custom[]> {
        let url: string;
        if (!annee) {
            url = environment.apiUrl + 'Bilan/sellProductsByMonths';
        } else {
            url = environment.apiUrl + 'Bilan/sellProductsByMonths/' + annee;
        }
        return this.http.get<Custom[]>(url);
    }

    entryQuantiteByMonths(annee?: number): Observable<Custom[]> {
        let url: string;
        if (!annee) {
            url = environment.apiUrl + 'Bilan/entryQuantiteByMonths';
        } else {
            url = environment.apiUrl + 'Bilan/entryQuantiteByMonths/' + annee;
        }
        return this.http.get<Custom[]>(url);
    }

    perimeQuantiteByMonths(annee?: number): Observable<Custom[]> {
        let url: string;
        if (!annee) {
            url = environment.apiUrl + 'Bilan/perimeQuantiteByMonths';
        } else {
            url = environment.apiUrl + 'Bilan/perimeQuantiteByMonths/' + annee;
        }
        return this.http.get<Custom[]>(url);
    }
}
