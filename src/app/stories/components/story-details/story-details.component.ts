import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Story } from 'src/app/core/models/story';
import { StoriesService } from 'src/app/core/services/http/stories.service';
import { SpinnerService } from 'src/app/shared/spinner/services/spinner.service';

@Component({
    selector: 'app-story-details',
    templateUrl: './story-details.component.html',
    styleUrls: ['./story-details.component.less']
})
export class StoryDetailsComponent implements OnInit {

    story: Story;
    token: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private storiesService: StoriesService,
        private toastrService: ToastrService,
        private spinnerService: SpinnerService,
    ) { }

    ngOnInit() {
        this.spinnerService.show();

        this.route.params.subscribe(params => {

            this.token = params['token'];

            this.storiesService.story(this.token).subscribe(
                story => {
                    this.story = story;
                },
                () => {
                    this.toastrService.error('Error during downloading story.');
                    
                    this.spinnerService.hide();
                    this.router.navigate(['/home']);
                },
                () => {
                    this.spinnerService.hide();
                }
            );
        });
    }

}
