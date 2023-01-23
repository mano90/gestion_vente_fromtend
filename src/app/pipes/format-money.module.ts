import { NgModule } from '@angular/core';
import { FormatMoneyPipe } from './format-money.pipe';

@NgModule({
    declarations: [FormatMoneyPipe],
    exports: [FormatMoneyPipe]
})
export class FormatMoneyModule {}
