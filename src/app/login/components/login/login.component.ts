import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Login } from '../../../core/models/login';
import { LoginMode } from '../../models/login-mode';
import { AuthorizationService } from 'src/app/core/services/authorization/authorization.service';
import { AccountService } from 'src/app/core/services/http/account.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

    login: Login;
    loginMode: LoginMode;
    errorMessage: string;
    returnUrl: string;

    constructor(
        private accountService: AccountService,
        private router: Router,
        private authorizationService: AuthorizationService,
        private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.login = new Login();
        this.loginMode = LoginMode.Login;

        this.route.queryParams.subscribe(async (params) => {
            this.returnUrl = params.returnUrl;
        });
    }

    async onSubmit(): Promise<void> {
        this.loginMode = LoginMode.Submitting;

        try {
            const accessToken = await this.accountService.login(this.login);
            this.authorizationService.signIn(accessToken);

            if (this.returnUrl) {
                this.router.navigateByUrl(this.returnUrl);
            } else {
                this.router.navigate(['/home']);
            }
        } catch (error) {

            if (error.error.code === 'invalidLoginCredentials') {
                this.errorMessage = 'Invalid credentials.';
            } else if (error.error.code === 'emailNotConfirmed') {
                this.errorMessage = 'Your email is not confirmed. Check your inbox or reset your password.';
            } else if (error.error.code === 'userAccountIsBlocked') {
                this.errorMessage = 'Your account is blocked. Contact with our support.';
            } else {
                this.errorMessage = 'Unknown login error. Try again later.';
            }

            this.loginMode = LoginMode.Error;
        }
    }

    isLoginMode(): Boolean {
        return this.loginMode === LoginMode.Login;
    }

    isSubmittingMode(): Boolean {
        return this.loginMode === LoginMode.Submitting;
    }

    isErrorMode(): Boolean {
        return this.loginMode === LoginMode.Error;
    }
}
