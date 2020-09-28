import { Component } from '@angular/core';

import { ForgotPassword } from 'src/app/models/forgot-password';
import { ForgotPasswordMode } from 'src/app/models/forgot-password-mode';
import { MessagesService } from 'src/app/services/common/messages.service';
import { ForgotPasswordService } from 'src/app/services/http/forgot-password.service';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.page.html',
    styleUrls: ['./forgot-password.page.scss']
})
export class ForgotPasswordPage {

    forgotPassword = new ForgotPassword('');
    forgotPasswordMode = ForgotPasswordMode.ForgotPassword;

    constructor(
        private forgotPasswordService: ForgotPasswordService,
        private messagesService: MessagesService) {
    }

    async onSubmit(): Promise<void> {
        try {
            this.forgotPasswordMode = ForgotPasswordMode.Submitting;
            await this.forgotPasswordService.token(this.forgotPassword);
            this.forgotPasswordMode = ForgotPasswordMode.Success;
        } catch (error) {
            if (error.error.code === 'userNotFound') {
                this.forgotPasswordMode = ForgotPasswordMode.UserNotExists;
                return;
            }

            this.forgotPasswordMode = ForgotPasswordMode.ForgotPassword;
            this.messagesService.showError('Unexpected error during resetting your password. Please try again.');
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

    resetMode(): void {
        this.forgotPasswordMode = ForgotPasswordMode.ForgotPassword;
    }
}
