import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';
import { ReCaptchaV3Service } from 'ngx-captcha';
import { ToastrService } from 'ngx-toastr';

import { User } from '../shared/models/user';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit {

    user: User = new User();
    isSubmitting: Boolean = false;

    constructor(
        private http: HttpClient,
        private reCaptchaV3Service: ReCaptchaV3Service,
        private router: Router,
        private toastr: ToastrService,
        @Inject(DOCUMENT) private document: any
    ) { }

    ngOnInit() {
    }

    async onSubmit() {
        this.isSubmitting = true;

        this.reCaptchaV3Service.execute(environment.recaptchaKey, 'homepage', async (token) => {

            this.user.securityToken = token;

            this.http.post<User>(environment.usersService + '/users', this.user).subscribe(
                () => {
                    this.isSubmitting = false;
                    this.removeGoogleBadge();

                    this.router.navigate(['/register-success']);
                },
                error => {
                    this.isSubmitting = false;

                    if (error.error.reason == "USER_WITH_EMAIL_EXISTS") {
                        this.router.navigate(['/register-user-exists']);
                        return;
                    }

                    this.toastr.error('Error', 'Unexpected error during creating new user. Please try again.');
                }
            )
        });
    }

    private removeGoogleBadge() {
        const googleBadge = this.document.getElementsByClassName('grecaptcha-badge');
        if (googleBadge && googleBadge.length > 0) {
            googleBadge[0].remove();
        }
    }
}
