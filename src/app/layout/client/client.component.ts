import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { ClientService } from './service/client.service';
import { Client } from '../../class/real/client';
import { fadePage } from '../../router.animations';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
    selector: 'app-client',
    templateUrl: './client.component.html',
    styleUrls: ['./client.component.scss'],
    animations: [fadePage()]
})
export class ClientComponent implements OnInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    @ViewChild('modalEdit', { static: false }) modalEdit: TemplateRef<any>;

    newClient: Client = new Client();
    updateClient: Client = new Client();
    displayedColumns: string[] = ['id', 'nom', 'prenoms', 'adresse', 'action'];
    dataSource: MatTableDataSource<Client> = new MatTableDataSource();
    constructor(private modalService: NgbModal, private service: ClientService, private spinner: NgxSpinnerService) {}

    ngOnInit() {
        this.listeClients();
    }
    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    getDataToUpdate(id: number, nom: string, prenoms?: string, adresse?: string) {
        this.updateClient.id = id;
        this.updateClient.nom = nom;
        this.updateClient.prenoms = prenoms;
        this.updateClient.adresse = adresse;
        this.open(this.modalEdit);
    }

    listeClients() {
        this.spinner.show();

        this.service.listeClients().subscribe(
            (resultat: Client[]) => {
                this.dataSource = new MatTableDataSource(resultat);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
                this.spinner.hide();
            },
            () => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: "Une erreur s'est produite"
                });
                this.spinner.hide();
            }
        );
    }

    deleteClient(id: number) {
        Swal.fire({
            title: 'Confirmation',
            text: 'Êtes-vous sur de vouloir supprimer ce client',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Annuler',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui, supprimer'
        }).then((result) => {
            if (result.value) {
                this.spinner.show();
                this.service.deleteClient(id).subscribe(
                    () => {
                        this.listeClients();
                    },
                    () => {
                        this.spinner.hide();
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: "Une erreur s'est produite"
                        });
                    },
                    () => {
                        this.spinner.hide();
                    }
                );
            }
        });
    }

    open(content: any) {
        this.modalService.open(content);
    }
    resetAdd() {
        this.newClient = new Client();
    }
    resetUpdate() {
        this.updateClient = new Client();
    }

    addClient() {
        this.spinner.show();
        this.service.addClient(this.newClient).subscribe(
            () => {
                this.listeClients();
            },
            () => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: "Une erreur s'est produite"
                });
                this.spinner.hide();
            },
            () => {
                this.spinner.hide();
                this.resetAdd();
            }
        );
    }

    updateTheClient() {
        this.spinner.show();
        this.service.addClient(this.updateClient).subscribe(
            () => {
                this.listeClients();
            },
            () => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: "Une erreur s'est produite"
                });
                this.spinner.hide();
            },
            () => {
                this.spinner.hide();
                this.resetUpdate();
            }
        );
    }
}
