import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { AccessToken } from 'src/app/models/access-token';
import { IdentityToken } from 'src/app/models/identity-token';

@Injectable({
    providedIn: 'root'
})
export class IdentityService {

    private get usersService() {
        return environment.httpSchema + environment.usersService;
    }

    constructor(private httpClient: HttpClient) {
    }

    public async login(identityToken: IdentityToken): Promise<AccessToken> {
        return this.httpClient.post<AccessToken>(this.usersService + '/identity/login', identityToken).toPromise();
    }
}
