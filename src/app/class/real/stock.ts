export class Stock {
    id: number;
    reference: string;
    quantite: number;
    datePeremption?: string;
    dateEntree: string;
    reste: number;
    nom?: string;
    typeProduit?: boolean;
    notification?: number;
}
