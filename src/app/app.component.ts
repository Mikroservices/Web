import { Component, OnDestroy, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';

import { LoadingService } from './services/common/loading.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy, AfterViewInit {
    showLoader = false;
    loadingStateChangesSubscription?: Subscription;

    constructor(
        private loadingService: LoadingService,
        private changeDetectorRef: ChangeDetectorRef) {
    }

    ngAfterViewInit(): void {
        this.loadingStateChangesSubscription = this.loadingService.loadingStateChanges.subscribe(isLoading => {
            this.showLoader = isLoading;
            this.changeDetectorRef.detectChanges();
            this.changeDetectorRef.markForCheck();
        });
    }

    ngOnDestroy(): void {
        this.loadingStateChangesSubscription?.unsubscribe();
    }
}
