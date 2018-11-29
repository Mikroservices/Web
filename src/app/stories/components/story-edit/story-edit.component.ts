import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from 'src/app/shared/spinner/services/spinner.service';
import { Story } from '../../models/story';

@Component({
    selector: 'app-story-edit',
    templateUrl: './story-edit.component.html',
    styleUrls: ['./story-edit.component.less']
})
export class StoryEditComponent implements OnInit, OnDestroy {

    title: string = '';
    text: string = '';

    private saveTimeout: any;
    private oneSecond = 1000;
    private refreshTimeout = 60;

    constructor(private zone: NgZone,
        private httpClient: HttpClient,
        private toastrService: ToastrService,
        private spinnerService: SpinnerService) { }

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

        const story = new Story();
        story.token = 'sr65re753kdt';
        story.title = this.title;
        story.text = this.text;

        this.httpClient.post<Story>(environment.storiesService + '/stories', story).subscribe(storyDto => {
            // this.stories = stories;
            console.log(storyDto);
        },
        () => {
            this.toastrService.error('Error during downloading stories settings.');
            this.spinnerService.hide();
        },
        () => {
            this.spinnerService.hide();
        });

    }
}
