import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { ToastrService } from 'ngx-toastr';

import { Story } from 'src/app/core/models/story';
import { StoriesService } from 'src/app/core/services/http/stories.service';
import { SpinnerService } from 'src/app/shared/spinner/services/spinner.service';
import { NavbarService } from 'src/app/core/menu/services/navbar.service';

@Component({
    selector: 'app-story-details',
    templateUrl: './story-details.component.html',
    styleUrls: ['./story-details.component.less']
})
export class StoryDetailsComponent implements OnInit, OnDestroy {

    story: Story;
    token: string;

    private editStoryActionSubscription: Subscription;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private storiesService: StoriesService,
        private toastrService: ToastrService,
        private spinnerService: SpinnerService,
        private navbarService: NavbarService
    ) { }

    ngOnInit(): void {
        this.navbarService.setEditStoryActionVisible();
        this.editStoryActionSubscription = this.navbarService.editStoryAction.subscribe(() => {
            this.router.navigate(['/stories/edit/', this.token]);
        });

        this.route.params.subscribe(async (params) => {
            try {
                this.spinnerService.show();
                this.token = params['token'];
                this.story = await this.storiesService.story(this.token);
            } catch {
                this.toastrService.error('Error during downloading story.');
                this.router.navigate(['/home']);
            } finally {
                this.spinnerService.hide();
            }
        });
    }

    ngOnDestroy(): void {
        this.editStoryActionSubscription.unsubscribe();
        this.navbarService.setNewStoryActionVisible();
    }
}
