import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { ConfirmEmail } from '../../models/confirm-email';
import { environment } from 'src/environments/environment';
import { ForgotPasswordMode } from '../../models/forgot-password-mode';

@Component({
    selector: 'app-confirm-email',
    templateUrl: './confirm-email.component.html',
    styleUrls: ['./confirm-email.component.less']
})
export class ConfirmEmailComponent implements OnInit {

    forgotPasswordMode: ForgotPasswordMode;

    constructor(
        private route: ActivatedRoute,
        private http: HttpClient
    ) { }

    ngOnInit() {
        this.forgotPasswordMode = ForgotPasswordMode.Validating;

        this.route.queryParams.subscribe(params => {

            const confirmEmail = new ConfirmEmail();
            confirmEmail.id = params.user;
            confirmEmail.confirmationGuid = params.token;

            this.http.post(environment.usersService + '/register/confirm', confirmEmail).subscribe(
                () => {
                    this.forgotPasswordMode = ForgotPasswordMode.Success;
                },
                () => {
                    this.forgotPasswordMode = ForgotPasswordMode.Error;
                }
            )
        });
    }

    isValidatingMode(): Boolean {
        return this.forgotPasswordMode == ForgotPasswordMode.Validating;
    }

    isErrorMode(): Boolean {
        return this.forgotPasswordMode == ForgotPasswordMode.Error;
    }

    isSuccessMode(): Boolean {
        return this.forgotPasswordMode == ForgotPasswordMode.Success;
    }
}
