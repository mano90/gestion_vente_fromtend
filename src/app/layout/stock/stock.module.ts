import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { StockRoutingModule } from './stock-routing.module';
import { StockComponent } from './stock.component';
import { PageHeaderModule } from '../../shared';
import { CdkTableModule } from '@angular/cdk/table';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { FormatNumberModule } from '../../pipes/format-number.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectFilterModule } from 'mat-select-filter';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
    imports: [
        CommonModule,
        StockRoutingModule,
        PageHeaderModule,
        FormsModule,
        CdkTableModule,
        MatInputModule,
        MatTableModule,
        FormatNumberModule,
        NgxSpinnerModule,
        MatSelectModule,
        MatFormFieldModule,
        MatSelectFilterModule,
        MatPaginatorModule
    ],
    declarations: [StockComponent]
})
export class StockModule {}
