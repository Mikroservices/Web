import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { JwtHelperService } from '@auth0/angular-jwt';

import { PersistanceService } from '../persistance/persistance.service';
import { User } from 'src/app/shared/models/user';
import { environment } from 'src/environments/environment';
import { AccessToken } from 'src/app/login/models/access-token';

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
        private httpClient: HttpClient,
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
        const sessionTimeout = tokenExpirationTime - this.tokenProcessingTime;
        this.initSessionTimeout(sessionTimeout);
    }

    signOut(): void {
        this.cancelSessionTimeout();
        this.persistanceService.removeAccessToken();
        this.changes.next(null);
    }

    refreshAccessToken() {
        const accessToken = this.persistanceService.getAccessToken();
        if (!accessToken) {
            return;
        }

        this.httpClient.post<AccessToken>(environment.usersService + '/account/refresh', new AccessToken(accessToken)).subscribe(
            result => {
                this.signIn(result.accessToken);
            },
            () => {
                this.signOut();
            }
        );
    }

    private getTokenExpirationTime(): number {
        const actionToken = this.persistanceService.getAccessToken();
        if (!actionToken) {
            return null;
        }

        const decodedToken = this.jwtHelperService.decodeToken(actionToken);
        return decodedToken.exp;
    }

    private initSessionTimeout(seconds: number): void {
        this.zone.runOutsideAngular(() => {
            this.sessionTimeout = setTimeout(
                () => this.refreshAccessToken(),
                this.oneSecond * seconds
            );
        });
    }

    private cancelSessionTimeout() {
        clearTimeout(this.sessionTimeout);
    }
}
