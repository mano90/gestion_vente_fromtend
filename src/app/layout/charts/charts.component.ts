import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { BilanService } from './service/bilan.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ExcelService } from './service/excel.service';
import { ChartItem } from '../../class/real/chart-item';
import Swal from 'sweetalert2';
import { Custom } from '../../class/real/custom';
import { fireOnInitToken } from '@sweetalert2/ngx-sweetalert2/lib/di';

class toExport {
    mois: string;
    montant: number;
}

class toExportWith {
    mois: string;
    produit: string;
    nombre: number;
}

@Component({
    selector: 'app-charts',
    templateUrl: './charts.component.html',
    styleUrls: ['./charts.component.scss'],
    animations: [routerTransition()]
})
export class ChartsComponent implements OnInit {
    barChartType: string = 'bar';
    dateDebutMostSell: string;
    dateFinMostSell: string;
    mostSellArray: ChartItem[];
    mostSellLabels: string[] = [];
    mostSellDatas: number[] = [];
    @ViewChild('modalYearRecette', { static: true }) modalYearRecette: TemplateRef<any>;
    inputYearRecette: number = new Date().getFullYear();
    inputYearProduit: number = new Date().getFullYear();
    inputYearEntry: number = new Date().getFullYear();
    inputYearPerime: number = new Date().getFullYear();
    months: string[] = [
        'Janvier',
        'Février',
        'Mars',
        'Avril',
        'Mai',
        'Juin',
        'Juillet',
        'Août',
        'Septembre',
        'Octobre',
        'Novembre',
        'Décembre'
    ];
    recettesByMonths: number[];
    // recetteMonth: number[];
    recetteData: any[] = [{ data: [], label: 'Montant' }];
    bilanProduitvendu: any[] = [{ data: [], label: '' }];
    bilanEntreeProduit: any[] = [{ data: [], label: '' }];
    bilanPerimeProduit: any[] = [{ data: [], label: '' }];

    constructor(private service: BilanService, private excel: ExcelService, private modalService: NgbModal) {}
    ngOnInit() {
        this.barChartLegend = true;
        this.pieChartType = 'pie';
        this.recette();
        this.sortProductsByMostSell();
        this.sellProductsByMonths();
        this.entryQuantiteByMonths();
        this.perimeQuantiteByMonths();
    }

    perimeQuantiteByMonths(annee?: number) {
        if (!annee) {
            this.service.perimeQuantiteByMonths().subscribe((res: Custom[]) => {
                let dt: Custom[] = res.map((element) => {
                    let d: Custom = new Custom();
                    d.label = element.label;
                    d.data = element.data;
                    return d;
                });
                this.bilanPerimeProduit = dt;
            });
        } else {
            this.service.perimeQuantiteByMonths(annee).subscribe((res: Custom[]) => {
                let dt: Custom[] = res.map((element) => {
                    let d: Custom = new Custom();
                    d.label = element.label;
                    d.data = element.data;
                    return d;
                });
                this.bilanPerimeProduit = dt;
            });
        }
    }
    entryQuantiteByMonths(annee?: number) {
        if (!annee) {
            this.service.entryQuantiteByMonths().subscribe((res: Custom[]) => {
                let dt: Custom[] = res.map((element) => {
                    let d: Custom = new Custom();
                    d.label = element.label;
                    d.data = element.data;
                    return d;
                });
                this.bilanEntreeProduit = dt;
            });
        } else {
            this.service.entryQuantiteByMonths(annee).subscribe((res: Custom[]) => {
                let dt: Custom[] = res.map((element) => {
                    let d: Custom = new Custom();
                    d.label = element.label;
                    d.data = element.data;
                    return d;
                });
                this.bilanEntreeProduit = dt;
            });
        }
    }
    sellProductsByMonths(annee?: number) {
        if (!annee) {
            this.service.sellProductsByMonths().subscribe(
                (res: Custom[]) => {
                    console.log(res);
                    let dt: Custom[] = res.map((element) => {
                        let d: Custom = new Custom();
                        d.label = element.label;
                        d.data = element.data;
                        return d;
                    });
                    this.bilanProduitvendu = dt;
                },
                (err: any) => {
                    console.log(err);
                }
            );
        } else {
            console.log(annee);

            this.service.sellProductsByMonths(annee).subscribe(
                (res: Custom[]) => {
                    console.log(res);
                    let dt: Custom[] = res.map((element) => {
                        let d: Custom = new Custom();
                        d.label = element.label;
                        d.data = element.data;
                        return d;
                    });
                    // for (let i = 0; i < res.lenght; i++) {

                    // }
                    this.bilanProduitvendu = dt;
                },
                (err: any) => {
                    console.log(err);
                }
            );
        }
    }

    sortProductsByMostSell() {
        this.service.sortProductsByMostSell().subscribe(
            (res: ChartItem[]) => {
                if (res.length > 0) {
                    this.mostSellLabels = res.map((element) => {
                        return element.label;
                    });
                    this.mostSellDatas = res.map((element) => {
                        return element.data;
                    });
                } else {
                    this.mostSellLabels = ['empty'];
                    this.mostSellDatas = [1];
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
    recette(annee?: number) {
        if (!annee) {
            this.service.recette().subscribe(
                (res: number[]) => {
                    this.recettesByMonths = res;
                    this.recetteData = [{ data: res, label: 'Montant' }];
                },
                (err: any) => {
                    console.log(err);
                }
            );
        } else {
            this.service.recette(annee).subscribe(
                (res: number[]) => {
                    this.recettesByMonths = res;

                    this.recetteData = [{ data: res, label: 'Montant' }];
                },
                (err: any) => {
                    console.log(err);
                }
            );
        }
    }

    pieChartColors: Array<any> = [
        {
            backgroundColor: [
                '#f0f8ff',
                '#faebd7',
                '#00ffff',
                '#7fffd4',
                '#f0ffff',
                '#f5f5dc',
                '#ffe4c4',
                '#000000',
                '#ffebcd',
                '#0000ff',
                '#8a2be2',
                '#a52a2a',
                '#deb887',
                '#5f9ea0',
                '#7fff00',
                '#d2691e',
                '#ff7f50',
                '#6495ed',
                '#fff8dc',
                '#dc143c',
                '#00ffff',
                '#00008b',
                '#008b8b',
                '#b8860b',
                '#a9a9a9',
                '#006400',
                '#a9a9a9',
                '#bdb76b',
                '#8b008b',
                '#556b2f'
            ],
            borderColor: ['rgba(0,0,0,0.5)', 'rgba(0,0,0,0.5)', 'rgba(0,0,0,0.5)']
        }
    ];

    open(content: any) {
        this.modalService.open(content, { centered: true, size: 'sm' });
    }

    selectBetweenDates(content: any) {
        this.modalService.open(content, { centered: true });
    }

    lengthYear(annee: number) {
        if (!annee) return false;
        if (annee.toString().length != 4) {
            return false;
        } else {
            return true;
        }
    }
    anotherYearRecette() {
        this.recette(this.inputYearRecette);
    }

    anotherYearProduit() {
        this.sellProductsByMonths(this.inputYearProduit);
    }
    anotherYearEntry() {
        this.entryQuantiteByMonths(this.inputYearEntry);
    }

    anotherYearPerime() {
        this.perimeQuantiteByMonths(this.inputYearPerime);
    }

    mostSellSetData() {
        this.service.sortProductsByMostSellWithDates(this.dateDebutMostSell, this.dateFinMostSell).subscribe(
            (res: ChartItem[]) => {
                if (res.length > 0) {
                    this.mostSellLabels = res.map((element) => {
                        return element.label;
                    });
                    this.mostSellDatas = res.map((element) => {
                        return element.data;
                    });
                } else {
                    this.mostSellLabels = ['empty'];
                    this.mostSellDatas = [1];
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

    exportRecette() {
        let i = 0;
        let montantTotal: number = 0;
        let data: toExport[] = this.recettesByMonths.map((element) => {
            const dt: toExport = new toExport();
            dt.mois = this.months[i];
            dt.montant = element;
            montantTotal += element;
            i++;
            return dt;
        });
        let last: toExport = new toExport();
        last.mois = 'Montant Total';
        last.montant = montantTotal;

        data.push(last);
        this.excel.exportAsExcelFile(data, 'Bilan_Mensuel_Revenu_Annee_' + this.inputYearRecette);
    }

    exportSelled() {
        let tableau: any[] = [];
        let pusheditems: any = {};

        for (let j = 0; j < 12; j++) {
            pusheditems = {};

            for (let i = 0; i < this.bilanProduitvendu.length; i++) {
                if (i == 0) {
                    pusheditems['Mois'] = this.months[j];
                }
                pusheditems[this.bilanProduitvendu[i].label] = this.bilanProduitvendu[i].data[j];
            }
            tableau.push(pusheditems);
        }

        this.excel.exportAsExcelFile(tableau, 'Bilan_Mensuel_Vente_Annee_' + this.inputYearProduit);
    }

    exportEntry() {
        let tableau: any[] = [];
        let pusheditems: any = {};

        for (let j = 0; j < 12; j++) {
            pusheditems = {};

            for (let i = 0; i < this.bilanEntreeProduit.length; i++) {
                if (i == 0) {
                    pusheditems['Mois'] = this.months[j];
                }
                pusheditems[this.bilanEntreeProduit[i].label] = this.bilanEntreeProduit[i].data[j];
            }
            tableau.push(pusheditems);
        }

        this.excel.exportAsExcelFile(tableau, 'Bilan_Mensuel_Entree_Annee_' + this.inputYearProduit);
    }

    exportPerime() {
        let tableau: any[] = [];
        let pusheditems: any = {};

        for (let j = 0; j < 12; j++) {
            pusheditems = {};

            for (let i = 0; i < this.bilanPerimeProduit.length; i++) {
                if (i == 0) {
                    pusheditems['Mois'] = this.months[j];
                }
                pusheditems[this.bilanPerimeProduit[i].label] = this.bilanPerimeProduit[i].data[j];
            }
            tableau.push(pusheditems);
        }

        this.excel.exportAsExcelFile(tableau, 'Bilan_Mensuel_Entree_Annee_' + this.inputYearProduit);
    }

    exportVente() {
        let data: any[] = [];
        let pusheditems: any = {};
        for (let i = 0; i < this.mostSellDatas.length; i++) {
            pusheditems[this.mostSellLabels[i]] = this.mostSellDatas[i];
        }
        data.push(pusheditems);

        this.excel.exportAsExcelFile(data, 'Bilan_Vente_');
    }

    barChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true
    };
    public barChartLegend: boolean;

    public pieChartType: string;

    public chartClicked(e: any): void {
        // console.log(e);
    }

    public chartHovered(e: any): void {
        // console.log(e);
    }
}
