import { Component, OnInit, NgZone, OnDestroy, HostListener } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

import { SpinnerService } from 'src/app/shared/spinner/services/spinner.service';
import { Story } from '../../models/story';
import { AuthorizationService } from 'src/app/core/services/authorization/authorization.service';


@Component({
    selector: 'app-story-edit',
    templateUrl: './story-edit.component.html',
    styleUrls: ['./story-edit.component.less']
})
export class StoryEditComponent implements OnInit, OnDestroy {

    title: string = '';
    text: string = '';
    token: string = null;

    private saveTimeout: any;
    private oneSecond = 1000;
    private refreshTimeout = 60;

    constructor(private zone: NgZone,
        private httpClient: HttpClient,
        private toastrService: ToastrService,
        private spinnerService: SpinnerService,
        private authorizationService: AuthorizationService) { }

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

    titleChanged(): void {
        this.save();
    }

    @HostListener('window:keydown', ['$event'])
    handleWindowEvent(event: KeyboardEvent): void {
        if ((event.metaKey || event.ctrlKey) && event.code === "KeyS") {
            this.save();
            event.preventDefault();
        }
    }

    private save(): void {
        if (this.token) {
            this.update();
        } else {
            this.create();
        }
    }

    private create(): void {
        this.spinnerService.show();

        const user = this.authorizationService.getUser();
        this.token = this.generateToken();

        const story = new Story();
        story.token = this.token;
        story.title = this.title;
        story.text = this.text;
        story.userId = user.id;

        this.httpClient.post<Story>(environment.storiesService + '/stories', story).subscribe(storyDto => {
            // this.stories = stories;
        },
        () => {
            this.toastrService.error('Error during saving story.');
            this.spinnerService.hide();
        },
        () => {
            this.spinnerService.hide();
        });
    }

    private update(): void {
        this.spinnerService.show();

        const user = this.authorizationService.getUser();

        const story = new Story();
        story.token = this.token;
        story.title = this.title;
        story.text = this.text;
        story.userId = user.id;

        this.httpClient.put<Story>(environment.storiesService + '/stories/' + this.token, story).subscribe(storyDto => {
            // this.stories = stories;
        },
        () => {
            this.toastrService.error('Error during saving story.');
            this.spinnerService.hide();
        },
        () => {
            this.spinnerService.hide();
        });
    }

    private generateToken(): string {
        var text = '';
        var possible = 'abcdefghijklmnopqrstuvwxyz0123456789';
      
        for (var i = 0; i < 12; i++)
          text += possible.charAt(Math.floor(Math.random() * possible.length));
      
        return text;
    }
}
