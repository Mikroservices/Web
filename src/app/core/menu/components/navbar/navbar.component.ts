import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { User } from 'src/app/core/models/user';
import { AuthorizationService } from 'src/app/core/services/authorization/authorization.service';
import { NavbarService } from '../../services/navbar.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.less']
})
export class NavbarComponent implements OnInit, OnDestroy {

    user: User = null;
    private userChangeSubscription: Subscription;

    constructor(
        private authorizationService: AuthorizationService,
        private navbarService: NavbarService) {
    }

    ngOnInit() {
        this.user = this.authorizationService.getUser();
        this.userChangeSubscription = this.authorizationService.changes.subscribe(user => {
            this.user = user;
        });
    }

    ngOnDestroy() {
        this.userChangeSubscription.unsubscribe();
    }

    isNewStoryActionVisible(): boolean {
        return this.navbarService.isNewStoryActionVisible;
    }

    isPublishStoryActionVisible(): boolean {
        return this.navbarService.isPublishStoryActionVisible;
    }

    isEditStoryActionVisible(): boolean {
        return this.navbarService.isEditStoryActionVisible;
    }

    signOut(): void {
        this.authorizationService.signOut();
    }

    onPublishStory(): void {
        this.navbarService.onPublishStoryAction();
    }

    onDeleteStory(): void {
        this.navbarService.onDeleteStoryAction();
    }

    onEditStory(): void {
        this.navbarService.onEditStoryAction();
    }
}
