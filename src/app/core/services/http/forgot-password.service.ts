import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { ForgotPassword } from 'src/app/core/models/forgot-password';
import { ResetPassword } from 'src/app/core/models/reset-password';

@Injectable({
    providedIn: 'root'
})
export class ForgotPasswordService {

    private get usersService() {
        return environment.httpSchema + environment.usersService;
    }

    constructor(private httpClient: HttpClient) {
    }

    public async token(forgotPassword: ForgotPassword): Promise<Object> {
        return this.httpClient.post(this.usersService + '/forgot/token', forgotPassword).toPromise();
    }

    public async confirm(resetPassword: ResetPassword): Promise<Object> {
        return this.httpClient.post(this.usersService + '/forgot/confirm', resetPassword).toPromise();
    }
}
