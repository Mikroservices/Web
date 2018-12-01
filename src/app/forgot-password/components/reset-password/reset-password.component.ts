import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { ResetPassword } from '../../models/reset-password';
import { ResetPasswordMode } from '../../models/reset-password-mode';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.less']
})
export class ResetPasswordComponent implements OnInit, OnDestroy {

    resetPassword: ResetPassword;
    resetPasswordMode: ResetPasswordMode;
    queryParamsSubscription: Subscription
    passwordIsValid: boolean;

    constructor(
        private route: ActivatedRoute,
        private http: HttpClient,
        private toastr: ToastrService) {
    }

    ngOnInit() {
        this.resetPassword = new ResetPassword();
        this.resetPasswordMode = ResetPasswordMode.ResetPassword;

        this.queryParamsSubscription = this.route.queryParams.subscribe(params => {
            this.resetPassword.forgotPasswordGuid = params.token;
        });
    }

    ngOnDestroy() {
        this.queryParamsSubscription.unsubscribe();
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

    passwordValid(valid: boolean): void {
        this.passwordIsValid = valid;
    }
}
