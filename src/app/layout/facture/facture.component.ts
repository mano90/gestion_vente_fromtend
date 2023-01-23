import { AfterViewInit, Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { FactureService } from './service/facture.service';
// import { Facture } from '../../class/real/client';
import { fadePage } from '../../router.animations';
import { NgxSpinnerService } from 'ngx-spinner';
import { ShortFacture } from '../../class/real/short-facture';
import { PanierItem } from '../../class/real/panier-item';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AchatClientProduit } from '../../class/real/AchatClientProduit';
// import { NumberToLetter } from 'contertir-nombre-lettre';
const { NumberToLetter } = require('convertir-nombre-lettre');

@Component({
    selector: 'app-facture',
    templateUrl: './facture.component.html',
    styleUrls: ['./facture.component.scss'],
    animations: [fadePage()]
})
export class FactureComponent implements OnInit {
    @ViewChild('modalFacture', { static: false }) modalFacture: TemplateRef<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    listeAchat: AchatClientProduit[];
    listeFactures: ShortFacture[];
    dataSource: MatTableDataSource<ShortFacture> = new MatTableDataSource();
    displayedColumns: string[] = ['date', 'client', 'montant', 'action'];
    totalAchat: number = 0;
    montantTotalLettre: string = '';
    dateAchat: Date;
    constructor(private service: FactureService, private modalService: NgbModal, private spinner: NgxSpinnerService) {}

    ngOnInit() {
        this.listeFacture();
    }

    listeFacture() {
        this.spinner.show();
        this.service.listeFacture().subscribe(
            (res: ShortFacture[]) => {
                this.listeFactures = res;
                this.dataSource = new MatTableDataSource(this.listeFactures);
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

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
    openModalFacture(date: Date, id: number) {
        this.spinner.show();
        this.service.getListeAChat(date, id).subscribe(
            (resultat: AchatClientProduit[]) => {
                this.listeAchat = resultat;

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
        this.modalService.open(this.modalFacture, { size: 'lg' });
    }

    print() {
        window.print();
    }

    previewPDF(date: Date, id: number) {
        this.dateAchat = date;
        this.service.getListeAChat(date, id).subscribe(
            (resultat: AchatClientProduit[]) => {
                this.totalAchat = 0;
                this.listeAchat = resultat;
                for (let i = 0; i < this.listeAchat.length; i++) {
                    this.totalAchat += this.listeAchat[i].total;
                }
                // console.log(NumberToLetter(12345));
                this.montantTotalLettre = NumberToLetter(this.totalAchat);
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
    async printPDF(date: Date, id: number) {
        window.print();
    }
}
