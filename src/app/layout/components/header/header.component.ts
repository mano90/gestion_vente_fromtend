import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { GraphiqueService } from '../../graphique.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    public pushRightClass: string;
    public slideGraphique: boolean = false;
    identifiant: string = localStorage.getItem('identifiant') || '';

    constructor(public router: Router, public graphiqueService: GraphiqueService) {
        this.router.events.subscribe((val) => {
            if (val instanceof NavigationEnd && window.innerWidth <= 992 && this.isToggled()) {
                this.toggleSidebar();
            }
        });
    }

    ngOnInit() {
        this.pushRightClass = 'push-right';
        this.graphiqueService.currentMessage.subscribe((slideGraphique) => (this.slideGraphique = slideGraphique));
    }
    changeSlideGraphique() {
        this.graphiqueService.changeMessage(this.slideGraphique);
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body')!;
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    onLoggedout() {
        localStorage.clear();
    }
}
