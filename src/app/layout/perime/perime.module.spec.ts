import { PerimeModule } from './perime.module';

describe('PerimeModule', () => {
    let perimeModule: PerimeModule;

    beforeEach(() => {
        perimeModule = new PerimeModule();
    });

    it('should create an instance', () => {
        expect(perimeModule).toBeTruthy();
    });
});
