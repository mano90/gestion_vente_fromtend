import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';
import { PageHeaderModule } from '../../shared';

import { FormsModule } from '@angular/forms';

import { CdkTableModule } from '@angular/cdk/table';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
    imports: [
        CommonModule,
        ClientRoutingModule,
        PageHeaderModule,
        FormsModule,
        CdkTableModule,
        MatInputModule,
        MatTableModule,
        NgxSpinnerModule,
        MatPaginatorModule
    ],
    declarations: [ClientComponent]
})
export class ClientModule {}
