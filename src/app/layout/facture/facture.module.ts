import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FactureRoutingModule } from './facture-routing.module';
import { FactureComponent } from './facture.component';
import { PageHeaderModule } from '../../shared';

import { FormsModule } from '@angular/forms';

import { CdkTableModule } from '@angular/cdk/table';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormatMoneyModule } from '../../pipes/format-money.module';
import { FormatNumberModule } from '../../pipes/format-number.module';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
    imports: [
        CommonModule,
        FactureRoutingModule,
        PageHeaderModule,
        FormsModule,
        CdkTableModule,
        MatInputModule,
        MatTableModule,
        NgxSpinnerModule,
        FormatMoneyModule,
        FormatNumberModule,
        MatPaginatorModule
    ],
    declarations: [FactureComponent]
})
export class FactureModule {}
