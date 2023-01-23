import { FactureModule } from './facture.module';

describe('FactureModule', () => {
    let factureModule: FactureModule;

    beforeEach(() => {
        factureModule = new FactureModule();
    });

    it('should create an instance', () => {
        expect(factureModule).toBeTruthy();
    });
});
