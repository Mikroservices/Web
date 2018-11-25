import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';

@Component({
    selector: 'app-story-edit',
    templateUrl: './story-edit.component.html',
    styleUrls: ['./story-edit.component.less']
})
export class StoryEditComponent implements OnInit, OnDestroy {

    title: String = '';
    story: String = '';

    private saveTimeout: any;
    private oneSecond = 1000;
    private refreshTimeout = 60;

    constructor(private zone: NgZone) { }

    ngOnInit(): void {
        this.initSavingTimeout();
    }

    ngOnDestroy(): void {
        if (this.saveTimeout) {
            clearTimeout(this.saveTimeout);
        }
    }

    initSavingTimeout(): void {
        this.zone.runOutsideAngular(() => {
            this.saveTimeout = setInterval(
                () => this.save(),
                this.oneSecond * this.refreshTimeout
            );
        });
    }

    private save(): void {
        console.log('saving...');
    }
}
