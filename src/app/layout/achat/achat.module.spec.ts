import { AchatModule } from './achat.module';

describe('AchatModule', () => {
    let achatModule: AchatModule;

    beforeEach(() => {
        achatModule = new AchatModule();
    });

    it('should create an instance', () => {
        expect(achatModule).toBeTruthy();
    });
});
