import { PrinterModule } from './printer.module';

describe('PrinterModule', () => {
    let printerModule: PrinterModule;

    beforeEach(() => {
        printerModule = new PrinterModule();
    });

    it('should create an instance', () => {
        expect(printerModule).toBeTruthy();
    });
});
