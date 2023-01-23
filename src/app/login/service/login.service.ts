import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    constructor(private http: HttpClient) {}

    login(data: any) {
        const url = 'http://localhost:3000/user/login';
        return this.http.post(url, data);
    }
}
