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

    ngOnInit(): void {
        this.forgotPassword = new ForgotPassword();
        this.forgotPasswordMode = ForgotPasswordMode.ForgotPassword;
    }

    async onSubmit(): Promise<void> {
        try {
            this.forgotPasswordMode = ForgotPasswordMode.Submitting;
            await this.forgotPasswordService.token(this.forgotPassword);
            this.forgotPasswordMode = ForgotPasswordMode.Success;
        } catch (error) {
            if (error.error.code === 'userNotExists') {
                this.forgotPasswordMode = ForgotPasswordMode.UserNotExists;
                return;
            }

            this.forgotPasswordMode = ForgotPasswordMode.ForgotPassword;
            this.toastr.error('Error', 'Unexpected error during resetting your password. Please try again.');
        }
    }

    isForgotPasswordMode(): boolean {
        return this.forgotPasswordMode === ForgotPasswordMode.ForgotPassword;
    }

    isSubmittingMode(): boolean {
        return this.forgotPasswordMode === ForgotPasswordMode.Submitting;
    }

    isUserNotExistsMode(): boolean {
        return this.forgotPasswordMode === ForgotPasswordMode.UserNotExists;
    }

    isSuccessMode(): boolean {
        return this.forgotPasswordMode === ForgotPasswordMode.Success;
    }

    resetMode() {
        this.forgotPasswordMode = ForgotPasswordMode.ForgotPassword;
    }
}
