import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { UserService } from 'src/app/core/services/user/user.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.less']
})
export class NavbarComponent implements OnInit, OnDestroy {

    user: User = null;
    private userChangeSubscription: Subscription;

    constructor(private userService: UserService) { }

    ngOnInit() {
        this.user = this.userService.getUser();
        this.userChangeSubscription = this.userService.changes.subscribe(user => {
            this.user = user;
        });
    }

    ngOnDestroy() {
        this.userChangeSubscription.unsubscribe();
    }

    signOut(): void {
        this.userService.signOut();
    }
}
