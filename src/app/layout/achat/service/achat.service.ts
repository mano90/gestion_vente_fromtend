import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CacheDB } from '../../../class/real/cache-db';
import { environment } from '../../../../environments/environment';
import { PanierItem } from '../../../class/real/panier-item';

@Injectable({
    providedIn: 'root'
})
export class AchatService {
    constructor(private http: HttpClient) {}

    addAchat(data: PanierItem[], id: number) {
        const url = environment.apiUrl + 'Achat/addNew';
        let dt;
        if (!id) {
            dt = {
                produit: data,
                id: null
            };
        } else {
            dt = {
                produit: data,
                id: id
            };
        }
        return this.http.post(url, dt);
    }

    getFromCache(): Observable<CacheDB[]> {
        const url = environment.apiUrl + 'getCache';
        return this.http.get<CacheDB[]>(url);
    }

    deleteCache() {
        const url = environment.apiUrl + 'deleteCache';
        return this.http.get(url);
    }
}
