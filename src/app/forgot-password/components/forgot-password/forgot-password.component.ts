import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ForgotPassword } from '../../models/forgot-password';
import { ForgotPasswordMode } from '../../models/forgot-password-mode';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.less']
})
export class ForgotPasswordComponent implements OnInit {

    forgotPassword: ForgotPassword;
    forgotPasswordMode: ForgotPasswordMode;

    constructor(
        private http: HttpClient, 
        private toastr: ToastrService) { 
    }

    ngOnInit() {
        this.forgotPassword = new ForgotPassword();
        this.forgotPasswordMode = ForgotPasswordMode.ForgotPassword;
    }

    async onSubmit() {
        this.forgotPasswordMode = ForgotPasswordMode.Submitting;

        this.http.post(environment.usersService + '/forgot/token', this.forgotPassword).subscribe(
            () => {
                this.forgotPasswordMode = ForgotPasswordMode.Success;
            },
            (error) => {

                if (error.error.reason == "USER_NOT_EXISTS") {    
                    this.forgotPasswordMode = ForgotPasswordMode.UserNotExists;
                    return;
                }

                this.forgotPasswordMode = ForgotPasswordMode.ForgotPassword;
                this.toastr.error('Error', 'Unexpected error during resetting your password. Please try again.');
            }
        )
    }

    isForgotPasswordMode() : Boolean {
        return this.forgotPasswordMode == ForgotPasswordMode.ForgotPassword;
    }

    isSubmittingMode(): Boolean {
        return this.forgotPasswordMode == ForgotPasswordMode.Submitting;
    }

    isUserNotExistsMode(): Boolean {
        return this.forgotPasswordMode == ForgotPasswordMode.UserNotExists;
    }

    isSuccessMode(): Boolean {
        return this.forgotPasswordMode == ForgotPasswordMode.Success;
    }

    resetMode() {
        this.forgotPasswordMode = ForgotPasswordMode.ForgotPassword;
    }
}
