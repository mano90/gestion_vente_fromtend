import { Component, ElementRef, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Produit } from './../../class/real/produit';
import Swal from 'sweetalert2';
import { ProduitService } from './service/produit.service';
import { fadePage } from '../../router.animations';
import { Stock } from '../../class/real/stock';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { environment } from '../../../environments/environment';
import { GraphiqueService } from '../graphique.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-produit',
    templateUrl: './produit.component.html',
    styleUrls: ['./produit.component.scss'],
    animations: [fadePage()]
})
export class ProduitComponent implements OnInit {
    slideGraphique: boolean;
    filterGraphique: string;
    customGraphicItems: Produit = new Produit();
    selectedFiles: FileList | null;
    selectedFilesEdit: FileList | null;
    currentFile: File | null;
    arrayProducts: Produit[] = [];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild('modalEdit', { static: false }) modalEdit: TemplateRef<any>;
    @ViewChild('modalEditGraphique', { static: false }) modalEditGraphique: TemplateRef<any>;
    @ViewChild('modalNewStock', { static: false }) modalNewStock: TemplateRef<any>;
    @ViewChild('buttonsShow', { static: false }) buttonsShow: TemplateRef<any>;
    @ViewChild('stockName', { static: true }) stockName: ElementRef;
    @ViewChild('stockReference', { static: true }) stockReference: ElementRef;
    newProduct: Produit = new Produit();
    updateProduit: Produit = new Produit();
    updateProduitGraphique: Produit = new Produit();
    addStock: Stock = new Stock();
    @ViewChild('UploadFileInput', { static: false }) uploadFileInput: ElementRef;
    fileUploadForm: FormGroup;
    fileInputLabel: string;
    constructor(
        private graphiqueService: GraphiqueService,
        private modalService: NgbModal,
        private service: ProduitService,
        private spinner: NgxSpinnerService,
        private http: HttpClient,
        private formBuilder: FormBuilder
    ) {}
    displayedColumns: string[] = [
        'reference',
        'nom',
        'prix',
        'typeProduit',
        'stock',
        'nombrePacket',
        'carton',
        'action'
    ];
    dataSource: MatTableDataSource<Produit> = new MatTableDataSource();

    ngOnInit() {
        this.fileUploadForm = this.formBuilder.group({
            uploadedImage: ['']
        });
        this.listeProduits();
        this.graphiqueService.currentMessage.subscribe((slideGraphique) => (this.slideGraphique = slideGraphique));
    }
    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
    showButtons(element: Produit) {
        this.customGraphicItems = new Produit();
        this.customGraphicItems = element;
        this.modalService.open(this.buttonsShow, { centered: true, size: 'sm' });
    }

    getDataToUpdateGraphique() {
        this.selectedFilesEdit = null;
        this.updateProduitGraphique.reference = this.customGraphicItems.reference;
        this.updateProduitGraphique.nom = this.customGraphicItems.nom;
        this.updateProduitGraphique.typeProduit = this.customGraphicItems.typeProduit;
        this.updateProduitGraphique.prix = this.customGraphicItems.prix;
        this.updateProduitGraphique.nombrePacket = this.customGraphicItems.nombrePacket;
        this.updateProduitGraphique.carton = this.customGraphicItems.carton;
        this.updateProduitGraphique.path = this.customGraphicItems.path;
        this.open(this.modalEditGraphique);
    }

    getDataToStockGraphique() {
        this.addStock = new Stock();
        this.addStock.reference = this.customGraphicItems.reference;
        this.addStock.nom = this.customGraphicItems.nom;
        if (this.customGraphicItems.typeProduit == true) {
            this.addStock.typeProduit = true;
        } else {
            this.addStock.typeProduit = false;
        }
        this.open(this.modalNewStock);
    }

    deleteProduitGraphique() {
        Swal.fire({
            title: 'Confirmation',
            text: 'Êtes-vous sur de vouloir supprimer ce produit',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Annuler',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui, supprimer'
        }).then((result) => {
            if (result.value) {
                this.service.deleteFile(this.customGraphicItems.path).subscribe(
                    () => {},
                    () => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: "Une erreur s'est produite"
                        });
                    }
                );
                this.spinner.show();
                this.service.deleteProduit(this.customGraphicItems.reference).subscribe(
                    () => {
                        this.listeProduits();
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

    listeProduits() {
        this.spinner.show();
        this.service.listeProduits().subscribe(
            (resultat: Produit[]) => {
                this.arrayProducts = resultat.map((element) => {
                    const item: Produit = new Produit();
                    item.nom = element.nom;
                    item.nombrePacket = element.nombrePacket;
                    item.carton = element.carton;
                    item.hasStock = element.hasStock;
                    item.path = element.path;
                    item.link = environment.apiUpload + element.path;
                    item.prix = element.prix;
                    item.reference = element.reference;
                    item.stock = element.stock;
                    item.typeProduit = element.typeProduit;
                    return item;
                });
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

    getDataToUpdate(
        reference: string,
        nom: string,
        prix: number,
        typeProduit: boolean,
        nombrePacket: number,
        carton: number
    ) {
        this.updateProduit.reference = reference;
        this.updateProduit.nom = nom;
        this.updateProduit.typeProduit = typeProduit;
        this.updateProduit.prix = prix;
        this.updateProduit.nombrePacket = nombrePacket;
        this.updateProduit.carton = carton;
        this.open(this.modalEdit);
    }

    getDataToStock(reference: string, nom: string, typeProduit: number) {
        this.addStock = new Stock();
        this.addStock.reference = reference;
        this.addStock.nom = nom;
        if (typeProduit == 1) {
            this.addStock.typeProduit = true;
        } else {
            this.addStock.typeProduit = false;
        }
        this.open(this.modalNewStock);
    }

    deleteProduit(reference: string, path: string) {
        Swal.fire({
            title: 'Confirmation',
            text: 'Êtes-vous sur de vouloir supprimer ce produit',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Annuler',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui, supprimer'
        }).then((result) => {
            if (result.value) {
                this.service.deleteFile(path).subscribe(
                    () => {},
                    () => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: "Une erreur s'est produite"
                        });
                    }
                );
                this.spinner.show();
                this.service.deleteProduit(reference).subscribe(
                    () => {
                        this.listeProduits();
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
        this.newProduct = new Produit();
    }
    resetUpdate() {
        this.updateProduit = new Produit();
    }

    addProduit() {
        this.currentFile = this.selectedFiles!.item(0);
        this.service.uploadFile(this.currentFile).subscribe(
            (res: any) => {
                // console.log(res.message);
                this.newProduct.path = res.message;
                this.spinner.show();
                this.service.addProduit(this.newProduct).subscribe(
                    () => {
                        this.listeProduits();
                    },
                    () => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: "Une erreur s'est produite"
                        });
                        this.service.deleteFile(this.newProduct.path).subscribe(
                            (res: any) => {
                                console.log(res);
                            },
                            (err: any) => {
                                console.log(err);
                            }
                        );
                        this.spinner.hide();
                    },
                    () => {
                        this.spinner.hide();
                        this.resetAdd();
                    }
                );
                this.selectedFiles = null;
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
    updateTheProductGraphique() {
        if (this.selectedFilesEdit) {
            this.service.deleteFile(this.updateProduitGraphique.path).subscribe(
                (res: any) => {
                    console.log(res);
                },
                (err: any) => {
                    console.log(err);
                }
            );
            this.currentFile = this.selectedFilesEdit.item(0);
            this.service.uploadFile(this.currentFile).subscribe(
                (res: any) => {
                    this.updateProduitGraphique.path = res.message;
                    this.spinner.show();
                    this.service.updateProduit(this.updateProduitGraphique).subscribe(
                        () => {
                            this.listeProduits();
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
                },
                () => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: "Une erreur s'est produite"
                    });
                }
            );
        } else {
            this.spinner.show();
            this.service.updateProduit(this.updateProduitGraphique).subscribe(
                () => {
                    this.listeProduits();
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

    updateTheProduct() {
        this.spinner.show();
        this.service.updateProduit(this.updateProduit).subscribe(
            () => {
                this.listeProduits();
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

    addToStock() {
        this.spinner.show();
        this.service.addStock(this.addStock).subscribe(
            () => {
                this.listeProduits();
                Swal.fire({
                    icon: 'success',
                    title: 'Success'
                });
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

    selectFile(event: any) {
        if (event.target.files[0].size >= 2000000) {
            Swal.fire({
                icon: 'error',
                title: ':(',
                text: "L'image doit être inférieur a 2 méga pixels"
            });
        } else {
            this.selectedFiles = event.target.files;
        }
    }

    selectFileEdit(event: any) {
        if (event.target.files[0].size >= 2000000) {
            Swal.fire({
                icon: 'error',
                title: ':(',
                text: "L'image doit être inférieur a 2 méga pixels"
            });
        } else {
            this.selectedFilesEdit = event.target.files;
        }
    }
}
