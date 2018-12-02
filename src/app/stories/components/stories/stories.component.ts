import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { Story } from '../../../core/models/story'
import { SpinnerService } from 'src/app/shared/spinner/services/spinner.service';
import { StoriesService } from 'src/app/core/services/http/stories.service';

@Component({
    selector: 'app-stories',
    templateUrl: './stories.component.html',
    styleUrls: ['./stories.component.less']
})
export class StoriesComponent implements OnInit {

    stories: Story[];

    constructor(private storiesService: StoriesService,
        private toastrService: ToastrService,
        private spinnerService: SpinnerService) { }

    ngOnInit() {

        this.storiesService.stories().subscribe(stories => {
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
