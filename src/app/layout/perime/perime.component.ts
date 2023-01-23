import { Component, ElementRef, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Produit } from './../../class/real/produit';
import Swal from 'sweetalert2';
import { PerimeService } from './service/perime.service';
import { fadePage } from '../../router.animations';
import { Stock } from '../../class/real/stock';
import { NgxSpinnerService } from 'ngx-spinner';
import { Search } from '../../class/real/search';
import { ShortProduit } from '../../class/real/short-produit';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
    selector: 'app-perime',
    templateUrl: './perime.component.html',
    styleUrls: ['./perime.component.scss'],
    animations: [fadePage()]
})
export class PerimeComponent implements OnInit {
    animal: string;
    name: string;
    listeReference: ShortProduit[];
    referenceFiltre: ShortProduit[];
    search: Search = new Search();
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    constructor(private modalService: NgbModal, private service: PerimeService, private spinner: NgxSpinnerService) {}
    displayedColumns: string[] = ['id', 'nom', 'dateEntree', 'quantite', 'datePeremption', 'action'];
    dataSource: MatTableDataSource<Stock> = new MatTableDataSource();
    ngOnInit() {
        this.listeStocks();
        this.listeShortReference();
    }

    listeShortReference() {
        this.spinner.show();
        this.service.listeShortReference().subscribe(
            (res: ShortProduit[]) => {
                this.listeReference = res;
                this.referenceFiltre = this.listeReference.slice();
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

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
    listeStocks() {
        this.spinner.show();
        this.service.listeStocks().subscribe(
            (resultat: Stock[]) => {
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
    deleteStockTrue(id: number) {
        Swal.fire({
            title: 'Confirmation',
            text: 'Êtes-vous sur de vouloir supprimer ce stock',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Annuler',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui, supprimer'
        }).then((result) => {
            if (result.value) {
                this.spinner.show();
                this.service.deleteStockTrue(id).subscribe(
                    () => {
                        this.listeStocks();
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

    deleteStock(id: number) {
        Swal.fire({
            title: 'Confirmation',
            text: 'Êtes-vous sur de vouloir supprimer ce stock',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Annuler',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui, supprimer'
        }).then((result) => {
            if (result.value) {
                this.spinner.show();
                this.service.deleteStock(id).subscribe(
                    () => {
                        this.listeStocks();
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

    pasteNomProduit(reference: string, nom: string) {
        this.search.nomSearch = nom;
        this.search.referenceSearch = reference;
    }

    advanceSearch() {
        this.spinner.show();
        this.service.search(this.search).subscribe(
            (resultat: Stock[]) => {
                this.dataSource = new MatTableDataSource(resultat);
                this.spinner.hide();
            },
            () => {
                this.spinner.hide();
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: "Une erreur s'est produite"
                });
            }
        );
    }
}
