import { Component, OnInit } from '@angular/core';

import { ResetPassword } from '../../models/reset-password';
import { ResetPasswordMode } from '../../models/reset-password-mode';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.less']
})
export class ResetPasswordComponent implements OnInit {

    resetPassword: ResetPassword;
    resetPasswordMode: ResetPasswordMode;

    constructor(
        private route: ActivatedRoute,
        private http: HttpClient,
        private toastr: ToastrService) {
    }

    ngOnInit() {
        this.resetPassword = new ResetPassword();
        this.resetPasswordMode = ResetPasswordMode.ResetPassword;

        this.route.queryParams.subscribe(params => {
            this.resetPassword.forgotPasswordGuid = params.token;
        });
    }

    async onSubmit() {
        this.resetPasswordMode = ResetPasswordMode.Submitting;

        this.http.post(environment.usersService + '/forgot/confirm', this.resetPassword).subscribe(
            () => {
                this.resetPasswordMode = ResetPasswordMode.Success;
            },
            () => {
                this.resetPasswordMode = ResetPasswordMode.ResetPassword;
                this.toastr.error('Error', 'Unexpected error during resetting your password. Please try again.');
            }
        );
    }

    isResetPasswordMode(): Boolean {
        return this.resetPasswordMode === ResetPasswordMode.ResetPassword;
    }

    isSubmittingMode(): Boolean {
        return this.resetPasswordMode === ResetPasswordMode.Submitting;
    }

    isSuccessMode(): Boolean {
        return this.resetPasswordMode === ResetPasswordMode.Success;
    }
}
