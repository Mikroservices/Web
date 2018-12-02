import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";

import { environment } from "src/environments/environment";
import { User } from "src/app/core/models/user";

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    private get usersService() {
        return environment.httpSchema + environment.usersService;
    }

    constructor(private httpClient: HttpClient) {
    }

    public profile(userName: string): Observable<User> {
        return this.httpClient.get<User>(this.usersService +  '/users/' + userName);
    }

    public update(userName: string, user: User): Observable<User> {
        return this.httpClient.put<User>(this.usersService + '/users/@' + userName, user);
    }

    public delete(userName: string): Observable<Object> {
        return this.httpClient.delete<User>(this.usersService + '/users/@' + userName);
    }
}