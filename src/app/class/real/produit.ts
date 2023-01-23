export class Produit {
    reference: string;
    nom: string;
    prix: number;
    typeProduit: boolean;
    stock?: number;
    nombrePacket: number;
    carton: number;
    hasStock?: boolean;
    path: string;
    link?: string;
}
