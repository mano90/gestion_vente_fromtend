import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Produit } from './../../class/real/produit';
import Swal from 'sweetalert2';
import { StockService } from './service/stock.service';
import { fadePage } from '../../router.animations';
import { Stock } from '../../class/real/stock';
import { NgxSpinnerService } from 'ngx-spinner';
import { Search } from '../../class/real/search';
import { ProduitService } from '../produit/service/produit.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
interface shortProduit {
    reference: string;
    nom: string;
}
@Component({
    selector: 'app-stock',
    templateUrl: './stock.component.html',
    styleUrls: ['./stock.component.scss'],
    animations: [fadePage()]
})
export class StockComponent implements OnInit {
    dateNow: Date = new Date();
    stockResponse = 0;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild('modalNewStock', { static: false }) modalNewStock: TemplateRef<any>;
    addStock: Stock = new Stock();
    listeReference: shortProduit[];
    referenceFiltre: shortProduit[];
    search: Search = new Search();
    constructor(
        private modalService: NgbModal,
        private service: StockService,
        private spinner: NgxSpinnerService,
        private produitService: ProduitService
    ) {}
    displayedColumns: string[] = ['id', 'nom', 'dateEntree', 'quantite', 'datePeremption', 'action'];
    dataSource: MatTableDataSource<Stock> = new MatTableDataSource();
    ngOnInit() {
        this.listeStocks();
        this.listeShortReference();
    }

    listeShortReference() {
        this.spinner.show();
        this.produitService.listeShortReference().subscribe(
            (res: shortProduit[]) => {
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
    resetAdd() {
        this.addStock = new Stock();
    }

    addToStock() {
        this.spinner.show();
        this.service.addStock(this.addStock).subscribe(
            () => {
                this.listeStocks();
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
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: "Une erreur s'est produite"
                });
                this.spinner.hide();
            }
        );
    }

    compareDates(dateEntree: string, datePeremption: string) {
        if (datePeremption == '' || !datePeremption) {
            return true;
        }
        let dateDebut = new Date(dateEntree);
        let dateFin = new Date(datePeremption);
        if (dateDebut.getTime() >= dateFin.getTime()) {
            return false;
        } else {
            return true;
        }
    }

    mediumAlert(dateEntree: string, datePeremption: string) {
        const dateE = new Date(dateEntree);
        const dateP = new Date(datePeremption);
    }
}
