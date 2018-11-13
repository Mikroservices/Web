import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.less']
})
export class NavbarComponent implements OnInit {

    user: User = null;
    isLoggedIn: Boolean = false;

    constructor(private userService: UserService) { }

    ngOnInit() {
        this.isLoggedIn = this.userService.isLoggedIn();
        this.user = this.userService.getUser();
    }
}
