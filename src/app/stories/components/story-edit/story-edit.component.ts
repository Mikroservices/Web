import { Component, OnInit, NgZone, OnDestroy, HostListener, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { Story } from '../../../core/models/story';
import { SpinnerService } from 'src/app/shared/spinner/services/spinner.service';
import { AuthorizationService } from 'src/app/core/services/authorization/authorization.service';
import { StoriesService } from 'src/app/core/services/http/stories.service';
import { NavbarService } from 'src/app/core/menu/services/navbar.service';

@Component({
    selector: 'app-story-edit',
    templateUrl: './story-edit.component.html',
    styleUrls: ['./story-edit.component.less']
})
export class StoryEditComponent implements OnInit, OnDestroy {

    title = '';
    text = '';
    token: string = null;

    publishStoryModalRef: BsModalRef;
    deleteStoryModalRef: BsModalRef;

    @ViewChild('publishStoryModal') publishStoryModalTemplate: TemplateRef<any>;
    @ViewChild('deleteStoryModal') deleteStoryModalTemplate: TemplateRef<any>;

    private publishStoryActionSubscription: Subscription;
    private deleteStoryActionSubscription: Subscription;

    private saveTimeout: any;
    private oneSecond = 1000;
    private refreshTimeout = 60;

    constructor(private zone: NgZone,
        private route: ActivatedRoute,
        private router: Router,
        private storiesService: StoriesService,
        private toastrService: ToastrService,
        private modalService: BsModalService,
        private spinnerService: SpinnerService,
        private authorizationService: AuthorizationService,
        private navbarService: NavbarService) { }

    ngOnInit(): void {
        this.navbarService.setPublishStoryActionVisible();

        this.publishStoryActionSubscription = this.navbarService.publishStoryAction.subscribe(() => {
            this.openPublishStoryModal(this.publishStoryModalTemplate);
        });

        this.deleteStoryActionSubscription = this.navbarService.deleteStoryAction.subscribe(() => {
            this.openDeleteStoryModal(this.deleteStoryModalTemplate);
        });

        this.initSavingTimeout();

        this.route.params.subscribe(async (params) => {
            try {
                this.token = params['token'];

                if (!this.token || this.token === '') {
                    return;
                }

                this.spinnerService.show();
                const story = await this.storiesService.story(this.token);
                this.title = story.title;
                this.text = story.text;
            } catch {
                this.toastrService.error('Error during downloading story.');
                this.router.navigate(['/stories']);
            } finally {
                this.spinnerService.hide();
            }
        });
    }

    ngOnDestroy(): void {
        if (this.saveTimeout) {
            clearTimeout(this.saveTimeout);
        }

        this.navbarService.setNewStoryActionVisible();
        this.publishStoryActionSubscription.unsubscribe();
        this.deleteStoryActionSubscription.unsubscribe();
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
        if ((event.metaKey || event.ctrlKey) && event.code === 'KeyS') {
            this.save();
            event.preventDefault();
        }
    }

    openPublishStoryModal(template: TemplateRef<any>) {
        this.publishStoryModalRef = this.modalService.show(template);
    }

    async onPublishStoryModal(): Promise<void> {
        try {
            this.spinnerService.show();
            await this.storiesService.publish(this.token);
            this.toastrService.success('Your story was published.');
            this.publishStoryModalRef.hide();
        } finally {
            this.spinnerService.hide();
        }
    }

    openDeleteStoryModal(template: TemplateRef<any>) {
        this.deleteStoryModalRef = this.modalService.show(template);
    }

    async onDeleteStoryModal(): Promise<void> {
        try {
            this.spinnerService.show();
            this.storiesService.delete(this.token);
            this.toastrService.success('Your story was deleted.');
            this.deleteStoryModalRef.hide();
            this.spinnerService.hide();
            this.router.navigate(['/stories']);
        } catch {
            this.spinnerService.hide();
        }
    }

    private save(): void {
        if (this.token) {
            this.update();
        } else {
            this.create();
        }
    }

    private async create(): Promise<void> {

        if (this.title === '' && this.text === '') {
            return;
        }

        this.spinnerService.show();

        const user = this.authorizationService.getUser();
        this.token = this.generateToken();

        const story = new Story();
        story.token = this.token;
        story.title = this.title;
        story.text = this.text;
        story.userId = user.id;

        try {
            await this.storiesService.create(story);
        } catch {
            this.toastrService.error('Error during saving story.');
        } finally {
            this.spinnerService.hide();
        }
    }

    private async update(): Promise<void> {
        this.spinnerService.show();

        const user = this.authorizationService.getUser();

        const story = new Story();
        story.token = this.token;
        story.title = this.title;
        story.text = this.text;
        story.userId = user.id;

        try {
            await this.storiesService.update(this.token, story);
        } catch {
            this.toastrService.error('Error during saving story.');
        } finally {
            this.spinnerService.hide();
        }
    }

    private generateToken(): string {
        let text = '';
        const possible = 'abcdefghijklmnopqrstuvwxyz0123456789';

        for (let i = 0; i < 12; i++) {
          text += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        return text;
    }
}
