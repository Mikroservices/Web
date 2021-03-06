import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

import { environment } from 'src/environments/environment';
import { ConfirmEmail } from 'src/app/core/models/confirm-email';
import { User } from 'src/app/core/models/user';
import { BooleanResult } from 'src/app/core/models/boolean-result';

@Injectable({
    providedIn: 'root'
})
export class RegisterService {

    private get usersService() {
        return environment.httpSchema + environment.usersService;
    }

    constructor(private httpClient: HttpClient) {
    }

    public async register(user: User): Promise<User> {
        return this.httpClient.post<User>(this.usersService + '/register', user).toPromise();
    }

    public async confirm(confirmEmail: ConfirmEmail): Promise<Object> {
        return this.httpClient.post(this.usersService + '/register/confirm', confirmEmail).toPromise();
    }

    public isUserNameTaken(userName: string): Observable<BooleanResult> {
        return this.httpClient.get<BooleanResult>(this.usersService + '/register/userName/' + userName);
    }

    public isEmailConnected(email: string): Observable<BooleanResult> {
        return this.httpClient.get<BooleanResult>(this.usersService + '/register/email/' + email);
    }
}
