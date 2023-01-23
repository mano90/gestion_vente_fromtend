import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, EventEmitter, OnInit, Output, Renderer2, TemplateRef, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Client } from '../../../class/real/client';
import Swal from 'sweetalert2';
import { ClientService } from '../../client/service/client.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    animations: [
        trigger('fadeIn', [state('void', style({ opacity: 0 })), transition(':enter, :leave', [animate(8000)])])
    ]
})
export class SidebarComponent implements OnInit {
    identifiant: string = localStorage.getItem('identifiant') || '';
    search: Client = new Client();
    newClientSide: Client = new Client();
    listeShow: boolean = false;
    characters: Client[];
    listeClients: Client[];
    clientFiltre: Client[];
    isActive: boolean;
    collapsed: boolean;
    showMenu: string;
    pushRightClass: string;
    @ViewChild('typeAchat', { static: true }) typeAchat: TemplateRef<any>;
    @ViewChild('typeAchatClient', { static: true }) typeAchatClient: TemplateRef<any>;
    @ViewChild('typeAchatNewClient', { static: true }) typeAchatNewClient: TemplateRef<any>;

    @Output() collapsedEvent = new EventEmitter<boolean>();

    constructor(
        public router: Router,
        private modalService: NgbModal,
        private service: ClientService,
        private el: ElementRef,
        private renderer: Renderer2,
        private clientService: ClientService
    ) {
        this.router.events.subscribe((val) => {
            if (val instanceof NavigationEnd && window.innerWidth <= 992 && this.isToggled()) {
                this.toggleSidebar();
            }
        });
    }

    ngOnInit() {
        this.isActive = false;
        this.collapsed = false;
        this.showMenu = '';
        this.pushRightClass = 'push-right';
        this.clientService.listeClients().subscribe(
            (res: Client[]) => {
                this.characters = res;
            },
            () => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: "Une erreur s'est produite"
                });
            }
        );
    }

    listeClient() {
        this.service.listeClients().subscribe(
            (resultat: Client[]) => {
                this.listeClients = resultat;
                this.clientFiltre = this.listeClients.slice();
                console.log(resultat);
            },
            () => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: "Une erreur s'est produite"
                });
            }
        );
    }

    eventCalled() {
        this.isActive = !this.isActive;
    }

    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }

    toggleCollapsed() {
        this.collapsed = !this.collapsed;
        this.collapsedEvent.emit(this.collapsed);
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

    listeAchat() {
        this.modalService.open(this.typeAchat, { centered: true, backdrop: 'static' });
    }

    modalListeClient(callBakc: CallableFunction) {
        this.listeClient();
        callBakc();
        this.modalService.open(this.typeAchatClient, { backdrop: 'static' });
    }

    closeAllModal() {
        this.modalService.dismissAll();
        // this.modalActive.close();
    }

    showList(client: Client) {
        this.search.nom = client.nom + ' ' + client.prenoms;
        this.search.id = client.id;
        this.search.adresse = client.adresse;
        this.listeShow = false;
    }

    hideList() {
        console.log('ato');
    }
    showUl() {
        this.listeShow = true;
    }

    showUlTwo() {
        if (this.search.nom == '') {
            this.listeShow = true;
        }
    }

    anonymeRoute(callBack: CallableFunction) {
        callBack();
        this.resetStorage();
        this.router.navigate(['/achatAnonyme']);
    }

    modalNewClient(callBack: CallableFunction) {
        callBack();
        this.modalService.open(this.typeAchatNewClient, { backdrop: 'static' });
    }
    submitExistingClient() {
        if (this.search.adresse) {
            this.router.navigate(['/achatExistClient']);
            this.resetStorage();
            localStorage.setItem('id', this.search.id!.toString());
            localStorage.setItem('nom', this.search.nom);
            localStorage.setItem('adresse', this.search.adresse);
        } else {
            this.router.navigate(['/achatExistClient']);
            this.resetStorage();
            localStorage.setItem('id', this.search.id!.toString());
            localStorage.setItem('nom', this.search.nom);
        }
    }

    addClient() {
        this.service.addReturn(this.newClientSide).subscribe(
            (res: Client) => {
                if (this.newClientSide.adresse) {
                    this.router.navigate(['/achatNewClient']);
                    this.resetStorage();
                    localStorage.setItem('id', res.id!.toString());
                    localStorage.setItem('nom', this.newClientSide.nom);
                    localStorage.setItem('adresse', this.newClientSide.adresse);
                } else {
                    this.router.navigate(['/achatNewClient']);
                    this.resetStorage();
                    localStorage.setItem('id', res.toString());
                    localStorage.setItem('nom', this.newClientSide.nom);
                    localStorage.removeItem('adresse');
                }
            },
            () => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: "Une erreur s'est produite"
                });
            }
        );
    }

    resetStorage() {
        localStorage.removeItem('id');
        localStorage.removeItem('nom');
        localStorage.removeItem('adresse');
    }
}
