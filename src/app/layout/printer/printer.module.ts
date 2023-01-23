import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { PrinterRoutingModule } from './printer-routing.module';
import { PrinterComponent } from './printer.component';
import { PageHeaderModule } from '../../shared';
import { CdkTableModule } from '@angular/cdk/table';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { FormatMoneyModule } from '../../pipes/format-money.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormatNumberModule } from '../../pipes/format-number.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FilterGraphiqueModule } from '../../pipes/filter-graphique.module';

import { ThermalPrintModule } from 'ng-thermal-print';
@NgModule({
    imports: [
        CommonModule,
        PrinterRoutingModule,
        PageHeaderModule,
        FormsModule,
        CdkTableModule,
        MatInputModule,
        MatTableModule,
        FormatMoneyModule,
        FormatNumberModule,
        MatPaginatorModule,
        NgxSpinnerModule,
        FilterGraphiqueModule,
        ThermalPrintModule
    ],
    declarations: [PrinterComponent]
})
export class PrinterModule {}
