import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerimeComponent } from './perime.component';

const routes: Routes = [
    {
        path: '',
        component: PerimeComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PerimeRoutingModule {}
