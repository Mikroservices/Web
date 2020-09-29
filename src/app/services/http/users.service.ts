import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/user';

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    private get usersService(): string {
        return environment.httpSchema + environment.usersService;
    }

    constructor(private httpClient: HttpClient) {
    }

    public async profile(userName: string): Promise<User> {
        return this.httpClient.get<User>(this.usersService +  '/users/' + userName).toPromise();
    }

    public async update(userName: string, user: User): Promise<User> {
        return this.httpClient.put<User>(this.usersService + '/users/@' + userName, user).toPromise();
    }

    public async delete(userName: string): Promise<object> {
        return this.httpClient.delete<User>(this.usersService + '/users/@' + userName).toPromise();
    }
}
