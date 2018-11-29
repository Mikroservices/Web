import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { Story } from '../../models/story'
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from 'src/app/shared/spinner/services/spinner.service';

@Component({
    selector: 'app-stories',
    templateUrl: './stories.component.html',
    styleUrls: ['./stories.component.less']
})
export class StoriesComponent implements OnInit {

    stories: Story[];

    constructor(private httpClient: HttpClient,
        private toastrService: ToastrService,
        private spinnerService: SpinnerService) { }

    ngOnInit() {

        this.httpClient.get<Story[]>(environment.storiesService + '/stories').subscribe(stories => {
            this.stories = stories;
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
