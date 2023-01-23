import { ProduitModule } from './produit.module';

describe('ProduitModule', () => {
    let produitModule: ProduitModule;

    beforeEach(() => {
        produitModule = new ProduitModule();
    });

    it('should create an instance', () => {
        expect(produitModule).toBeTruthy();
    });
});
