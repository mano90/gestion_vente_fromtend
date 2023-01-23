import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from '../../../class/real/client';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ClientService {
    constructor(private http: HttpClient) {}

    listeClients(): Observable<Client[]> {
        const url = environment.apiUrl + 'Client/liste';
        return this.http.get<Client[]>(url);
    }
    deleteClient(id: number) {
        const url = environment.apiUrl + 'Client/deleteClient/' + id;
        return this.http.get(url);
    }

    addClient(data: Client) {
        const url = environment.apiUrl + 'Client/add';
        return this.http.post(url, data);
    }

    addReturn(data: Client): Observable<Client> {
        const url = environment.apiUrl + 'Client/add';
        return this.http.post<Client>(url, data);
    }
}
