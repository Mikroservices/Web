import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";

import { environment } from "src/environments/environment";
import { AccessToken } from "src/app/core/models/access-token";
import { Login } from "src/app/core/models/login";
import { ChangePassword } from "src/app/core/models/change-password";

@Injectable({
    providedIn: 'root'
})
export class AccountService {

    private get usersService() {
        return environment.httpSchema + environment.usersService;
    }

    constructor(private httpClient: HttpClient) {
    }

    public refreshToken(accessToken: string): Observable<AccessToken> {
        return this.httpClient.post<AccessToken>(this.usersService + '/account/refresh', new AccessToken(accessToken));
    }

    public login(login: Login): Observable<AccessToken> {
        return this.httpClient.post<AccessToken>(this.usersService + '/account/login', login);
    }

    public changePassword(changePassword: ChangePassword): Observable<Object> {
        return this.httpClient.post(this.usersService + '/account/change-password', changePassword);
    }
}