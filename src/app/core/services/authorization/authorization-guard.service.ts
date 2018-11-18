import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthorizationService } from './authorization.service';


@Injectable({
    providedIn: 'root'
})
export class AuthorizationGuardService implements CanActivate {

    constructor(
        public authorizationService: AuthorizationService,
        public router: Router
    ) { }

    async canActivate(): Promise<boolean> {

        if (!this.authorizationService.isLoggedIn()) {
            await this.authorizationService.signOut();
            this.router.navigate(['/login']);

            return false;
        }

        return true;
    }
}