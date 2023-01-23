import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PerimeComponent } from './perime.component';

describe('PerimeComponent', () => {
    let component: PerimeComponent;
    let fixture: ComponentFixture<PerimeComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [PerimeComponent]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(PerimeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
