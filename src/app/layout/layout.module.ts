import { CommonModule } from '@angular/common';
import { LOCALE_ID, NgModule } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { FormatMoneyPipe } from '../pipes/format-money.pipe';
import { FormatNumberPipe } from '../pipes/format-number.pipe';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { MatSelectModule } from '@angular/material/select';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectFilterModule } from 'mat-select-filter';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { FilterModule } from '../pipes/filter.module';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
registerLocaleData(localeFr, 'fr');
@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule,
        NgbDropdownModule,
        MatFormFieldModule,
        MatSelectFilterModule,
        MatSelectModule,
        MatDialogModule,
        FormsModule,
        FilterModule,
        MatSliderModule,
        MatSlideToggleModule
    ],
    declarations: [LayoutComponent, SidebarComponent, HeaderComponent],
    providers: [FormatNumberPipe, FormatMoneyPipe, { provide: LOCALE_ID, useValue: 'fr' }]
})
export class LayoutModule {}
