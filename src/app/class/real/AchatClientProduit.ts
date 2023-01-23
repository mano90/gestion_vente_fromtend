import { Client } from './client';
import { Produit } from './produit';

export interface AchatClientProduit {
    id?: number;
    date: Date;
    reference: Produit;
    total: number;
    client: Client;
    typeAchat: number;
    nombre: number;
    quantite: number;
}
