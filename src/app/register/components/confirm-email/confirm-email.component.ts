import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ConfirmEmail } from '../../../core/models/confirm-email';
import { ConfirmEmailMode } from '../../models/confirm-email-mode';
import { RegisterService } from 'src/app/core/services/http/register.service';

@Component({
    selector: 'app-confirm-email',
    templateUrl: './confirm-email.component.html',
    styleUrls: ['./confirm-email.component.less']
})
export class ConfirmEmailComponent implements OnInit {

    confirmEmailMode: ConfirmEmailMode;

    constructor(
        private route: ActivatedRoute,
        private registerService: RegisterService
    ) { }

    ngOnInit() {
        this.confirmEmailMode = ConfirmEmailMode.Validating;

        this.route.queryParams.subscribe(params => {

            const confirmEmail = new ConfirmEmail();
            confirmEmail.id = params.user;
            confirmEmail.confirmationGuid = params.token;

            this.registerService.confirm(confirmEmail).subscribe(
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
