import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

import { environment } from 'src/environments/environment';
import { AccessToken } from 'src/app/models/access-token';
import { Login } from 'src/app/models/login';
import { ChangePassword } from 'src/app/models/change-password';
import { RefreshToken } from 'src/app/models/refresh-token';

@Injectable({
    providedIn: 'root'
})
export class AccountService {

    private get usersService() {
        return environment.httpSchema + environment.usersService;
    }

    constructor(private httpClient: HttpClient) {
    }

    public async refreshToken(refreshToken: string): Promise<AccessToken> {
        return this.httpClient.post<AccessToken>(
            this.usersService + '/account/refresh',
            new RefreshToken(refreshToken)
        ).toPromise();
    }

    public async login(login: Login): Promise<AccessToken> {
        return this.httpClient.post<AccessToken>(this.usersService + '/account/login', login).toPromise();
    }

    public async changePassword(changePassword: ChangePassword): Promise<Object> {
        return this.httpClient.post(this.usersService + '/account/change-password', changePassword).toPromise();
    }
}
