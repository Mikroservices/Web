import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { AuthorizationService } from 'src/app/core/services/authorization/authorization.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.less']
})
export class NavbarComponent implements OnInit, OnDestroy {

    user: User = null;
    private userChangeSubscription: Subscription;

    constructor(private authorizationService: AuthorizationService) { }

    ngOnInit() {
        this.user = this.authorizationService.getUser();
        this.userChangeSubscription = this.authorizationService.changes.subscribe(user => {
            this.user = user;
        });
    }

    ngOnDestroy() {
        this.userChangeSubscription.unsubscribe();
    }

    signOut(): void {
        this.authorizationService.signOut();
    }
}
