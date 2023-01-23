import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { LoginService } from './service/login.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent {
    user: { identifiant: string; password: string } = {
        identifiant: '',
        password: ''
    };
    error: string = '';
    constructor(public router: Router, private service: LoginService) {}

    submitFormLogin() {
        this.service.login(this.user).subscribe(
            (res: any) => {
                this.error = '';
                localStorage.setItem('token', res.token.data.token);
                localStorage.setItem('identifiant', res.identifiant);
                localStorage.setItem('role', res.role);
                this.router.navigate(['/produit']);
            },
            (err) => {
                this.error = 'Login ou mot de passe incorrect';
                console.log(err);
            }
        );
    }
}
