import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Login } from '../../models/login';
import { AccessToken } from '../../models/access-token';
import { LoginMode } from '../../models/login-mode';
import { environment } from 'src/environments/environment';
import { PersistanceService } from 'src/app/shared/services/persistance.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

    login: Login;
    loginMode: LoginMode;

    constructor(
        private http: HttpClient, 
        private router: Router, 
        private persistanceService: PersistanceService) { 
    }

    ngOnInit() {
        this.login = new Login();
        this.loginMode = LoginMode.Login;
    }

    async onSubmit() {
        this.loginMode = LoginMode.Submitting;

        this.http.post<AccessToken>(environment.usersService + '/login', this.login).subscribe(
            (result) => {
                this.persistanceService.set('action_token', result.actionToken);
                this.router.navigate(['/home']);
            },
            () => {
                this.loginMode = LoginMode.Error;
            }
        )
    }

    isLoginMode() : Boolean {
        return this.loginMode == LoginMode.Login;
    }

    isSubmittingMode(): Boolean {
        return this.loginMode == LoginMode.Submitting;
    }

    isErrorMode(): Boolean {
        return this.loginMode == LoginMode.Error;
    }
}
