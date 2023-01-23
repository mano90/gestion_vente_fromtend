import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PageHeaderModule } from '../../shared';

import { AchatRoutingModule } from './achat-routing.module';
import { AchatComponent } from './achat.component';
import { FormsModule } from '@angular/forms';

import { CdkTableModule } from '@angular/cdk/table';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormatMoneyModule } from '../../pipes/format-money.module';
import { FilterProduitModule } from '../../pipes/filter-produit.module';
import { FormatNumberModule } from '../../pipes/format-number.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FilterGraphiqueCustomModule } from '../../pipes/filter-graphique-custom.module';
@NgModule({
    imports: [
        CommonModule,
        AchatRoutingModule,
        PageHeaderModule,
        FormsModule,
        CdkTableModule,
        MatInputModule,
        MatTableModule,
        NgxSpinnerModule,
        FormatMoneyModule,
        FormatNumberModule,
        FilterProduitModule,
        MatCheckboxModule,
        FilterGraphiqueCustomModule
    ],
    declarations: [AchatComponent]
})
export class AchatModule {}
