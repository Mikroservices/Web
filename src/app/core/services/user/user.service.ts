import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { JwtHelperService } from '@auth0/angular-jwt';

import { PersistanceService } from '../persistance/persistance.service';
import { User } from 'src/app/shared/models/user';


@Injectable({
    providedIn: 'root'
})
export class UserService {

    public changes = new BehaviorSubject<User>(this.getUser());

    constructor(
        private jwtHelperService: JwtHelperService,
        private persistanceService: PersistanceService) {
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

        return user;
    }

    signIn(accessToken: string): void {
        this.persistanceService.setAccessToken(accessToken);

        const user = this.getUser();
        this.changes.next(user);
    }

    signOut(): void {
        this.persistanceService.removeAccessToken();
        this.changes.next(null);
    }
}
