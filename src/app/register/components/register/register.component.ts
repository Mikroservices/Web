import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';
import { ReCaptchaV3Service } from 'ngx-captcha';

import { User } from '../../models/user';
import { RegisterMode } from '../../models/register-mode';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit {

    user: User;
    registerMode: RegisterMode;

    constructor(
        private http: HttpClient,
        private reCaptchaV3Service: ReCaptchaV3Service,
        @Inject(DOCUMENT) private document: any
    ) { }

    ngOnInit() {
        this.registerMode = RegisterMode.Register;
        this.user = new User();
    }

    async onSubmit() {
        this.registerMode = RegisterMode.Submitting;

        this.reCaptchaV3Service.execute(environment.recaptchaKey, 'homepage', async (token) => {

            this.user.securityToken = token;

            this.http.post<User>(environment.usersService + '/register', this.user).subscribe(
                () => {
                    this.removeGoogleBadge();
                    this.registerMode = RegisterMode.Success;
                },
                error => {
                    this.removeGoogleBadge();

                    if (error.error.code === 'userWithEmailExists') {
                        this.registerMode = RegisterMode.UserExists;
                        return;
                    }

                    this.registerMode = RegisterMode.Error;
                }
            );
        });
    }

    isRegisterMode(): Boolean {
        return this.registerMode === RegisterMode.Register;
    }

    isSubmittingMode(): Boolean {
        return this.registerMode === RegisterMode.Submitting;
    }

    isUserExistsMode(): Boolean {
        return this.registerMode === RegisterMode.UserExists;
    }

    isSuccessMode(): Boolean {
        return this.registerMode === RegisterMode.Success;
    }

    isErrorMode(): Boolean {
        return this.registerMode === RegisterMode.Error;
    }


    private removeGoogleBadge() {
        const googleBadge = this.document.getElementsByClassName('grecaptcha-badge');
        if (googleBadge && googleBadge.length > 0) {
            googleBadge[0].remove();
        }
    }
}
