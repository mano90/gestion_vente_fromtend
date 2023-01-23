import { Component, OnInit } from '@angular/core';
import { GraphiqueService } from './graphique.service';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
    collapedSideBar: boolean;

    constructor() {}

    ngOnInit() {}

    receiveCollapsed($event: any) {
        this.collapedSideBar = $event;
    }
}
