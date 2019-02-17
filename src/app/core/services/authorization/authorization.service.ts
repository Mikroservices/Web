import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { JwtHelperService } from '@auth0/angular-jwt';

import { PersistanceService } from '../persistance/persistance.service';
import { User } from 'src/app/core/models/user';
import { AccountService } from '../http/account.service';

@Injectable({
    providedIn: 'root'
})
export class AuthorizationService {

    public changes = new BehaviorSubject<User>(this.getUser());
    private sessionTimeout: any;
    private tokenProcessingTime = 30;
    private oneSecond = 1000;

    constructor(
        private jwtHelperService: JwtHelperService,
        private persistanceService: PersistanceService,
        private accountService: AccountService,
        private zone: NgZone) {
    }

    isLoggedIn(): Boolean {

        const actionToken = this.persistanceService.getAccessToken();
        if (!actionToken) {
            return false;
        }

        if (this.jwtHelperService.isTokenExpired(actionToken)) {
            return false;
        }

        return true;
    }

    getUser(): User | null {

        const actionToken = this.persistanceService.getAccessToken();
        if (!actionToken) {
            return null;
        }

        const decodedToken = this.jwtHelperService.decodeToken(actionToken);

        const user = new User();
        user.id = decodedToken.id;
        user.email = decodedToken.email;
        user.name = decodedToken.name;
        user.userName = decodedToken.userName;
        user.gravatarHash = decodedToken.gravatarHash;

        return user;
    }

    signIn(accessToken: string): void {
        this.persistanceService.setAccessToken(accessToken);

        const user = this.getUser();
        this.changes.next(user);

        const tokenExpirationTime = this.getTokenExpirationTime();
        const now = new Date();

        const tokenExpirationSeconds = Math.round(tokenExpirationTime.getTime() / this.oneSecond);
        const nowSeconds = Math.round(now.getTime() / this.oneSecond);

        const sessionTimeout = (tokenExpirationSeconds - nowSeconds) - this.tokenProcessingTime;
        this.initSessionTimeout(sessionTimeout);
    }

    signOut(): void {
        this.cancelSessionTimeout();
        this.persistanceService.removeAccessToken();
        this.changes.next(null);
    }

    async refreshAccessToken(): Promise<void> {
        const accessToken = this.persistanceService.getAccessToken();
        if (!accessToken) {
            return;
        }

        try {
            const refreshedAccessToken = await this.accountService.refreshToken(accessToken);
            this.signIn(refreshedAccessToken.accessToken);
        } catch {
            this.signOut();
        }
    }

    private getTokenExpirationTime(): Date {
        const actionToken = this.persistanceService.getAccessToken();
        if (!actionToken) {
            return null;
        }

        const decodedToken = this.jwtHelperService.decodeToken(actionToken);
        return new Date(Math.round(decodedToken.exp * this.oneSecond));
    }

    private initSessionTimeout(seconds: number): void {
        this.zone.runOutsideAngular(() => {
            this.sessionTimeout = setTimeout(
                async () => this.refreshAccessToken(),
                this.oneSecond * seconds
            );
        });
    }

    private cancelSessionTimeout() {
        clearTimeout(this.sessionTimeout);
    }
}
