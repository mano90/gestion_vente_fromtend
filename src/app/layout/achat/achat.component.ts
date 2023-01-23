import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Client } from '../../class/real/client';
import { fadePage } from '../../router.animations';
import { ProduitService } from '../produit/service/produit.service';
import Swal from 'sweetalert2';
import { Produit } from '../../class/real/produit';
import { CdkConnectedOverlay } from '@angular/cdk/overlay';
import { AchatService } from './service/achat.service';
import { PanierItem } from '../../class/real/panier-item';
import { ShortProduit } from '../../class/real/short-produit';
import { NgxSpinnerService } from 'ngx-spinner';
import { CacheDB } from '../../class/real/cache-db';
import { GraphiqueService } from '../graphique.service';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-achat',
    templateUrl: './achat.component.html',
    styleUrls: ['./achat.component.scss'],
    animations: [fadePage()]
})
export class AchatComponent implements OnInit {
    @ViewChild('buttonsShow', { static: false }) buttonsShow: TemplateRef<any>;
    customGraphicItems: PanierItem = new PanierItem();
    slideGraphique: boolean;
    filterGraphique: string;
    arrayProducts: Produit[] = [];
    synchronised: boolean = false;
    listeCachePanier: PanierItem[] = [];
    indexCache: number = 0;
    listeCache: CacheDB[];
    listeReference: ShortProduit[];
    referenceFiltre: ShortProduit[];
    client: Client = new Client();
    listeShow: boolean = false;
    listePanier: PanierItem[] = [];
    panier: PanierItem = new PanierItem();
    errorQuantite: boolean = false;
    errorQuantiteGraphique: boolean = false;
    totalPaid: number = 0;
    constructor(
        public router: Router,
        private produitService: ProduitService,
        private modalService: NgbModal,
        private service: AchatService,
        private spinner: NgxSpinnerService,
        private graphiqueService: GraphiqueService,

        private service1: ProduitService
    ) {
        this.graphiqueService.currentMessage.subscribe((slideGraphique) => (this.slideGraphique = slideGraphique));
    }
    myDate: Date = new Date();
    ngOnInit() {
        delete this.client.id;
        // this.client.id = null;
        if (localStorage.getItem('id')) {
            this.client.id = +localStorage.getItem('id')!;
            this.client.nom = localStorage.getItem('nom')!;
            if (localStorage.getItem('adresse')) {
                this.client.adresse = localStorage.getItem('adresse')!;
            }
        }
        this.listeProduits();
        this.listeShortReference();
    }
    showButtons(element: Produit) {
        this.customGraphicItems = new PanierItem();
        this.customGraphicItems.reference = element.reference;
        this.customGraphicItems.nom = element.nom;
        this.customGraphicItems.stock = element.stock!;
        this.customGraphicItems.prixUnitaire = element.prix;
        this.customGraphicItems.nombrePacket = element.nombrePacket;
        this.customGraphicItems.carton = element.carton;
        this.modalService.open(this.buttonsShow, { centered: true });
    }
    listeProduits() {
        this.service1.listeProduits().subscribe(
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
                // this.dataSource = new MatTableDataSource(resultat);
                // this.dataSource.paginator = this.paginator;
                // this.dataSource.sort = this.sort;
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
    listeShortReference() {
        this.spinner.show();
        this.produitService.listeShortReference().subscribe(
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

    open(content: any) {
        this.modalService.open(content);
    }

    showUl() {
        this.listeShow = true;
    }
    showUl2() {
        if (this.panier.reference == '') {
            this.listeShow = true;
        }
    }

    getInfo(reference: string) {
        this.panier.reference = reference;
        this.listeShow = false;
        this.produitService.getItem(reference).subscribe(
            (produit: any) => {
                this.panier.nom = produit.nom;
                this.panier.prixUnitaire = produit.prix;
                this.panier.nombrePacket = produit.nombrePacket;
                this.panier.carton = produit.carton;
                if (produit.stock == null) {
                    this.panier.stock = 0;
                } else {
                    this.panier.stock = produit.stock;
                }
                this.calculateTotal();
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
    calculateTotalGraphique() {
        if (
            this.customGraphicItems.nombre &&
            (this.customGraphicItems.typeAchat == 0 ||
                this.customGraphicItems.typeAchat == 1 ||
                this.customGraphicItems.typeAchat == 2)
        ) {
            if (this.customGraphicItems.typeAchat == 0) {
                this.customGraphicItems.quantite = this.customGraphicItems.nombre;
                console.log(this.customGraphicItems.quantite);
                console.log(this.customGraphicItems.nombre);
            } else if (this.customGraphicItems.typeAchat == 1) {
                this.customGraphicItems.quantite =
                    this.customGraphicItems.nombre * this.customGraphicItems.nombrePacket!;
            } else {
                this.customGraphicItems.quantite = this.customGraphicItems.nombre * this.customGraphicItems.carton!;
            }
            if (this.customGraphicItems.quantite <= this.customGraphicItems.stock) {
                this.errorQuantiteGraphique = false;

                this.customGraphicItems.total = this.customGraphicItems.quantite * this.customGraphicItems.prixUnitaire;
            } else {
                this.errorQuantiteGraphique = true;
                delete this.customGraphicItems.total;

                // this.customGraphicItems.total = undefined;
            }
        }
        if (this.customGraphicItems.quantite === 0 || this.customGraphicItems.nombre === 0) {
            this.errorQuantiteGraphique = true;
            delete this.customGraphicItems.total;
            // this.customGraphicItems.total = undefined;
        }
    }
    calculateTotal() {
        if (
            this.panier.nombre &&
            (this.panier.typeAchat == 0 || this.panier.typeAchat == 1 || this.panier.typeAchat == 2)
        ) {
            if (this.panier.typeAchat == 0) {
                this.panier.quantite = this.panier.nombre;
                console.log(this.panier.quantite);
                console.log(this.panier.nombre);
            } else if (this.panier.typeAchat == 1) {
                this.panier.quantite = this.panier.nombre * this.panier.nombrePacket!;
            } else {
                this.panier.quantite = this.panier.nombre * this.panier.carton!;
            }
            if (this.panier.quantite <= this.panier.stock) {
                this.errorQuantite = false;

                this.panier.total = this.panier.quantite * this.panier.prixUnitaire;
            } else {
                this.errorQuantite = true;
                delete this.panier.total;

                // this.panier.total = undefined;
            }
        }
        if (this.panier.quantite === 0 || this.panier.nombre === 0) {
            this.errorQuantite = true;
            delete this.panier.total;
            // this.panier.total = undefined;
        }
    }

    addToPanier() {
        const indexElement = this.listePanier.findIndex((element) => element.reference == this.panier.reference);
        if (indexElement != -1) {
            if (this.listePanier[indexElement].stock < this.listePanier[indexElement].quantite + this.panier.quantite) {
                alert('Quantité en stock insuffisant');
            } else {
                if (this.listePanier[indexElement].typeAchat == this.panier.typeAchat) {
                    this.listePanier[indexElement].nombre += this.panier.nombre;
                    this.listePanier[indexElement].quantite += this.panier.quantite;
                    this.listePanier[indexElement].total! += this.panier.total!;
                    this.panier = new PanierItem();
                } else {
                    const itemToPush: PanierItem = {
                        reference: this.panier.reference,
                        nom: this.panier.nom,
                        nombre: this.panier.nombre,
                        quantite: this.panier.quantite,
                        typeAchat: this.panier.typeAchat,
                        stock: this.panier.stock,
                        prixUnitaire: this.panier.prixUnitaire,
                        total: this.panier.total
                    };

                    this.listePanier.push(itemToPush);
                    this.panier = new PanierItem();
                }
            }
        } else {
            const itemToPush: PanierItem = {
                reference: this.panier.reference,
                nom: this.panier.nom,
                nombre: this.panier.nombre,
                quantite: this.panier.quantite,
                typeAchat: this.panier.typeAchat,
                stock: this.panier.stock,
                prixUnitaire: this.panier.prixUnitaire,
                total: this.panier.total
            };

            this.listePanier.push(itemToPush);
            this.panier = new PanierItem();
        }
        this.getTotalMoney();
    }

    addToPanierGraphique(closeModal: CallableFunction) {
        const indexElement = this.listePanier.findIndex(
            (element) => element.reference == this.customGraphicItems.reference
        );
        if (indexElement != -1) {
            if (
                this.listePanier[indexElement].stock <
                this.listePanier[indexElement].quantite + this.customGraphicItems.quantite
            ) {
                alert('Quantité en stock insuffisant');
            } else {
                if (this.listePanier[indexElement].typeAchat == this.customGraphicItems.typeAchat) {
                    this.listePanier[indexElement].nombre += this.customGraphicItems.nombre;
                    this.listePanier[indexElement].quantite += this.customGraphicItems.quantite;
                    this.listePanier[indexElement].total! += this.customGraphicItems.total!;
                    this.panier = new PanierItem();
                } else {
                    const itemToPush: PanierItem = {
                        reference: this.customGraphicItems.reference,
                        nom: this.customGraphicItems.nom,
                        nombre: this.customGraphicItems.nombre,
                        quantite: this.customGraphicItems.quantite,
                        typeAchat: this.customGraphicItems.typeAchat,
                        stock: this.customGraphicItems.stock,
                        prixUnitaire: this.customGraphicItems.prixUnitaire,
                        total: this.customGraphicItems.total
                    };

                    this.listePanier.push(itemToPush);
                    this.panier = new PanierItem();
                }
            }
        } else {
            const itemToPush: PanierItem = {
                reference: this.customGraphicItems.reference,
                nom: this.customGraphicItems.nom,
                nombre: this.customGraphicItems.nombre,
                quantite: this.customGraphicItems.quantite,
                typeAchat: this.customGraphicItems.typeAchat,
                stock: this.customGraphicItems.stock,
                prixUnitaire: this.customGraphicItems.prixUnitaire,
                total: this.customGraphicItems.total
            };

            this.listePanier.push(itemToPush);
            this.panier = new PanierItem();
        }
        this.getTotalMoney();
        closeModal();
    }

    getTotalMoney() {
        this.totalPaid = 0;
        for (let i = 0; i < this.listePanier.length; i++) {
            this.totalPaid += this.listePanier[i]['total']!;
        }
    }

    getIndex(i: number) {
        this.listePanier.splice(i, 1);
        this.getTotalMoney();
    }

    addAchat() {
        Swal.fire({
            title: 'Confirmation',
            text: 'Cet achat sera enregistré',
            icon: 'info',
            showCancelButton: true,
            cancelButtonText: 'Annuler',
            confirmButtonColor: '#4bb543',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui, confirmer!'
        }).then((result) => {
            if (result.isConfirmed) {
                this.spinner.show();
                this.service.addAchat(this.listePanier, this.client.id!).subscribe(
                    (res: any) => {
                        this.spinner.hide();
                        if (res == true) {
                            Swal.fire({
                                icon: 'success',
                                title: ':)',
                                text: 'success'
                            });
                            this.deleteCache();
                            this.router.navigate(['/facture']);
                        } else {
                            Swal.fire({
                                icon: 'info',
                                title: ':(',
                                text: 'Aucune donnée insérée'
                            });
                        }
                        console.log(res);
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
        });
    }
    resetListePanier() {
        this.listeCachePanier = [];
    }
    getDataFromDb() {
        this.service.getFromCache().subscribe(
            (res: any) => {
                if (res) {
                    if (res.length == undefined) {
                        this.produitService.getItem(res.reference).subscribe(
                            (produit: any) => {
                                if (produit) {
                                    let toReturn: PanierItem = new PanierItem();

                                    toReturn.nombre = +res.nombre;
                                    if (res.typeAchat == 0) {
                                        toReturn.quantite = +res.nombre;
                                    } else if (res.typeAchat == 1) {
                                        toReturn.quantite = +res.nombre * +produit.nombrePacket;
                                    } else {
                                        toReturn.quantite = +res.nombre * +produit.carton;
                                    }
                                    toReturn.typeAchat = +res.typeAchat;
                                    toReturn.reference = produit.reference;
                                    toReturn.nom = produit.nom;
                                    toReturn.prixUnitaire = +produit.prix;
                                    if (produit.stock == null) {
                                        toReturn!.stock = 0;
                                    } else {
                                        toReturn!.stock = +produit.stock;
                                    }
                                    if (toReturn!.stock < toReturn!.quantite) {
                                        delete toReturn!.total;
                                    } else {
                                        toReturn!.total = +toReturn!.quantite * +toReturn!.prixUnitaire;
                                    }
                                    this.listeCachePanier.push(toReturn);
                                    if (this.listeCachePanier.length == 1) {
                                        this.synchronised = true;
                                        this.panier = this.listeCachePanier[this.indexCache];
                                        this.indexCache++;
                                    }
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
                    } else {
                        for (let i = 0; i < res.length; i++) {
                            this.produitService.getItem(res[i].reference).subscribe(
                                (produit: any) => {
                                    if (produit) {
                                        let toReturn: PanierItem = new PanierItem();

                                        toReturn.nombre = +res[i].nombre;
                                        if (res[i].typeAchat == 0) {
                                            toReturn.quantite = +res[i].nombre;
                                        } else if (res[i].typeAchat == 1) {
                                            toReturn.quantite = +res[i].nombre * +produit.nombrePacket;
                                        } else {
                                            toReturn.quantite = +res[i].nombre * +produit.carton;
                                        }
                                        toReturn.typeAchat = +res[i].typeAchat;
                                        toReturn.reference = produit.reference;
                                        toReturn.nom = produit.nom;
                                        toReturn.prixUnitaire = +produit.prix;
                                        if (produit.stock == null) {
                                            toReturn!.stock = 0;
                                        } else {
                                            toReturn!.stock = +produit.stock;
                                        }
                                        if (toReturn!.stock < toReturn!.quantite) {
                                            delete toReturn!.total;
                                        } else {
                                            toReturn!.total = +toReturn!.quantite * +toReturn!.prixUnitaire;
                                        }
                                        this.listeCachePanier.push(toReturn);
                                        if (this.listeCachePanier.length == 1) {
                                            this.synchronised = true;
                                            this.panier = this.listeCachePanier[this.indexCache];
                                            this.indexCache++;
                                        }
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
                    }
                } else {
                    Swal.fire({
                        icon: 'info',
                        text: 'Aucune donnée'
                    });
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

    nextCache() {
        if (this.listeCachePanier.length > this.indexCache) {
            this.addToPanier();
            this.panier = this.listeCachePanier[this.indexCache];
            this.indexCache++;
        }
    }

    deleteCache() {
        this.service.deleteCache().subscribe();
        this.panier = new PanierItem();
        this.listeCachePanier = [];
    }

    removeItem(dismissModal: CallableFunction) {
        if (this.listeCachePanier.length > 0) {
            this.listeCachePanier.splice(this.indexCache, 1);
            if (this.listeCachePanier.length > this.indexCache) {
                this.panier = this.listeCachePanier[this.indexCache];
            } else if (this.listeCachePanier.length > this.indexCache) {
                dismissModal();
                this.deleteCache();
            } else {
                if (this.listeCachePanier.length == this.indexCache) {
                    dismissModal();
                    this.deleteCache();
                } else {
                    if (this.listeCachePanier.length > 0) {
                        this.indexCache--;
                        this.panier = this.listeCachePanier[this.indexCache];
                    } else {
                        dismissModal();
                        this.deleteCache();
                    }
                }
            }
        } else {
            dismissModal();
            this.deleteCache();
        }
    }

    resetSync() {
        this.synchronised = false;
        this.panier = new PanierItem();
        this.indexCache = 0;
    }

    finishSync(dismissModal: CallableFunction) {
        this.addToPanier();
        dismissModal();
        this.deleteCache();
    }
}
