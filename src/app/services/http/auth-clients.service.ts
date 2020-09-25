import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { AuthClient } from 'src/app/models/auth-client';

@Injectable({
    providedIn: 'root'
})
export class AuthClientsService {

    private get usersService(): string {
        return environment.httpSchema + environment.usersService;
    }

    constructor(private httpClient: HttpClient) {
    }

    public async getList(): Promise<AuthClient[]> {
        return this.httpClient.get<AuthClient[]>(this.usersService + '/auth-clients').toPromise();
    }
}
