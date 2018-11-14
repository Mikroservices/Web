import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { ConfirmEmail } from '../../models/confirm-email';
import { environment } from 'src/environments/environment';
import { ConfirmEmailMode } from '../../models/confirm-email-mode';

@Component({
    selector: 'app-confirm-email',
    templateUrl: './confirm-email.component.html',
    styleUrls: ['./confirm-email.component.less']
})
export class ConfirmEmailComponent implements OnInit {

    confirmEmailMode: ConfirmEmailMode;

    constructor(
        private route: ActivatedRoute,
        private http: HttpClient
    ) { }

    ngOnInit() {
        this.confirmEmailMode = ConfirmEmailMode.Validating;

        this.route.queryParams.subscribe(params => {

            const confirmEmail = new ConfirmEmail();
            confirmEmail.id = params.user;
            confirmEmail.confirmationGuid = params.token;

            this.http.post(environment.usersService + '/register/confirm', confirmEmail).subscribe(
                () => {
                    this.confirmEmailMode = ConfirmEmailMode.Success;
                },
                () => {
                    this.confirmEmailMode = ConfirmEmailMode.Error;
                }
            );
        });
    }

    isValidatingMode(): Boolean {
        return this.confirmEmailMode === ConfirmEmailMode.Validating;
    }

    isErrorMode(): Boolean {
        return this.confirmEmailMode === ConfirmEmailMode.Error;
    }

    isSuccessMode(): Boolean {
        return this.confirmEmailMode === ConfirmEmailMode.Success;
    }
}
