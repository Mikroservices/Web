import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from './user.service';


@Injectable({
    providedIn: 'root'
})
export class AuthorizationGuardService implements CanActivate {

    constructor(
        public userService: UserService,
        public router: Router
    ) { }

    async canActivate(): Promise<boolean> {

        if (!this.userService.isLoggedIn()) {
            await this.userService.signOut();
            this.router.navigate(['/login']);

            return false;
        }

        return true;
    }
}