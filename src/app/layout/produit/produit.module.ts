import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProduitRoutingModule } from './produit-routing.module';
import { ProduitComponent } from './produit.component';
import { PageHeaderModule } from '../../shared';
import { CdkTableModule } from '@angular/cdk/table';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { FormatMoneyModule } from '../../pipes/format-money.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormatNumberModule } from '../../pipes/format-number.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FilterGraphiqueModule } from '../../pipes/filter-graphique.module';

@NgModule({
    imports: [
        CommonModule,
        ProduitRoutingModule,
        PageHeaderModule,
        FormsModule,
        ReactiveFormsModule,
        CdkTableModule,
        MatInputModule,
        MatTableModule,
        FormatMoneyModule,
        FormatNumberModule,
        MatPaginatorModule,
        NgxSpinnerModule,
        FilterGraphiqueModule
    ],
    declarations: [ProduitComponent]
})
export class ProduitModule {}
