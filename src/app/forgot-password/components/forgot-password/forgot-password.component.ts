import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { ForgotPassword } from '../../../core/models/forgot-password';
import { ForgotPasswordMode } from '../../models/forgot-password-mode';
import { ForgotPasswordService } from 'src/app/core/services/http/forgot-password.service';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.less']
})
export class ForgotPasswordComponent implements OnInit {

    forgotPassword: ForgotPassword;
    forgotPasswordMode: ForgotPasswordMode;

    constructor(
        private forgotPasswordService: ForgotPasswordService,
        private toastr: ToastrService) {
    }

    ngOnInit() {
        this.forgotPassword = new ForgotPassword();
        this.forgotPasswordMode = ForgotPasswordMode.ForgotPassword;
    }

    async onSubmit() {
        this.forgotPasswordMode = ForgotPasswordMode.Submitting;

        this.forgotPasswordService.token(this.forgotPassword).subscribe(
            () => {
                this.forgotPasswordMode = ForgotPasswordMode.Success;
            },
            (error) => {

                if (error.error.code === 'userNotExists') {
                    this.forgotPasswordMode = ForgotPasswordMode.UserNotExists;
                    return;
                }

                this.forgotPasswordMode = ForgotPasswordMode.ForgotPassword;
                this.toastr.error('Error', 'Unexpected error during resetting your password. Please try again.');
            }
        );
    }

    isForgotPasswordMode(): Boolean {
        return this.forgotPasswordMode === ForgotPasswordMode.ForgotPassword;
    }

    isSubmittingMode(): Boolean {
        return this.forgotPasswordMode === ForgotPasswordMode.Submitting;
    }

    isUserNotExistsMode(): Boolean {
        return this.forgotPasswordMode === ForgotPasswordMode.UserNotExists;
    }

    isSuccessMode(): Boolean {
        return this.forgotPasswordMode === ForgotPasswordMode.Success;
    }

    resetMode() {
        this.forgotPasswordMode = ForgotPasswordMode.ForgotPassword;
    }
}
