import { Injectable } from '@angular/core';

import { LoadingBarService } from '@ngx-loading-bar/core';

@Injectable({
    providedIn: 'root'
})
export class SpinnerService {

    constructor(private loadingBar: LoadingBarService) { }

    show() {
        this.loadingBar.start();
    }

    hide() {
        this.loadingBar.complete();
    }
}
