import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'produit', pathMatch: 'prefix' },
            {
                path: 'produit',
                loadChildren: () => import('./produit/produit.module').then((m) => m.ProduitModule)
            },
            // { path: 'produit', loadChildren: () => import('./produit/produit.module').then((m) => m.ProduitModule) },
            { path: 'client', loadChildren: () => import('./client/client.module').then((m) => m.ClientModule) },
            { path: 'achatAnonyme', loadChildren: () => import('./achat/achat.module').then((m) => m.AchatModule) },
            { path: 'achatExistClient', loadChildren: () => import('./achat/achat.module').then((m) => m.AchatModule) },
            { path: 'achatNewClient', loadChildren: () => import('./achat/achat.module').then((m) => m.AchatModule) },
            { path: 'stock', loadChildren: () => import('./stock/stock.module').then((m) => m.StockModule) },
            { path: 'perime', loadChildren: () => import('./perime/perime.module').then((m) => m.PerimeModule) },
            { path: 'facture', loadChildren: () => import('./facture/facture.module').then((m) => m.FactureModule) },
            { path: 'charts', loadChildren: () => import('./charts/charts.module').then((m) => m.ChartsModule) },
            { path: 'printer', loadChildren: () => import('./printer/printer.module').then((m) => m.PrinterModule) }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
