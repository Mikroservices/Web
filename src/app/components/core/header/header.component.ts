import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthorizationService } from '../../../services/authorization/authorization.service';
import { User } from 'src/app/models/user';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

    public user: User;
    private userChangeSubscription: Subscription;

    constructor(
        private authorizationService: AuthorizationService,
        private router: Router) {
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

    async signOut(): Promise<void> {
        await this.authorizationService.signOut();
        await this.router.navigate(['/login']);
    }
}