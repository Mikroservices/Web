import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ReCaptchaV3Service } from 'ngx-captcha';

import { RegisterMode } from '../../models/register-mode';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/core/models/user';
import { RegisterService } from 'src/app/core/services/http/register.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit {

    user: User;
    registerMode: RegisterMode;
    errorMessage: string;
    passwordIsValid: boolean;

    constructor(
        private registerService: RegisterService,
        private reCaptchaV3Service: ReCaptchaV3Service,
        @Inject(DOCUMENT) private document: any
    ) { }

    ngOnInit(): void {
        this.registerMode = RegisterMode.Register;
        this.user = new User();
    }

    async onSubmit() {
        this.registerMode = RegisterMode.Submitting;

        this.reCaptchaV3Service.execute(environment.recaptchaKey, 'homepage', async (token) => {

            try {
                this.user.securityToken = token;
                await this.registerService.register(this.user);
                this.removeGoogleBadge();
                this.registerMode = RegisterMode.Success;
            } catch (error) {
                if (error.error.code === 'userNameIsAlreadyTaken') {
                    this.errorMessage = 'User name is already taken. Please choose different one.';
                } else if (error.error.code === 'emailIsAlreadyConnected') {
                    this.errorMessage = 'Given email is already connected with other account.';
                } else {
                    this.errorMessage = 'Unexpected error occurred. Please try again.';
                }

                this.registerMode = RegisterMode.Error;
            }
        });
    }

    isRegisterMode(): boolean {
        return this.registerMode === RegisterMode.Register;
    }

    isSubmittingMode(): boolean {
        return this.registerMode === RegisterMode.Submitting;
    }

    isSuccessMode(): boolean {
        return this.registerMode === RegisterMode.Success;
    }

    isErrorMode(): boolean {
        return this.registerMode === RegisterMode.Error;
    }

    passwordValid(valid: boolean): void {
        this.passwordIsValid = valid;
    }

    private removeGoogleBadge() {
        const googleBadge = this.document.getElementsByClassName('grecaptcha-badge');
        if (googleBadge && googleBadge.length > 0) {
            googleBadge[0].remove();
        }
    }
}
