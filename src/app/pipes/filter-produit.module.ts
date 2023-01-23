import { NgModule } from '@angular/core';
import { FilterProduit } from './filter-produit.pipe';

@NgModule({
    declarations: [FilterProduit],
    exports: [FilterProduit]
})
export class FilterProduitModule {}
