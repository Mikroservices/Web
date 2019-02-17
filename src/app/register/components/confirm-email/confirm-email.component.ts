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

    ngOnInit(): void {
        this.confirmEmailMode = ConfirmEmailMode.Validating;

        this.route.queryParams.subscribe(async (params) => {

            const confirmEmail = new ConfirmEmail();
            confirmEmail.id = params.user;
            confirmEmail.confirmationGuid = params.token;

            try {
                await this.registerService.confirm(confirmEmail);
                this.confirmEmailMode = ConfirmEmailMode.Success;
            } catch {
                this.confirmEmailMode = ConfirmEmailMode.Error;
            }
        });
    }

    isValidatingMode(): boolean {
        return this.confirmEmailMode === ConfirmEmailMode.Validating;
    }

    isErrorMode(): boolean {
        return this.confirmEmailMode === ConfirmEmailMode.Error;
    }

    isSuccessMode(): boolean {
        return this.confirmEmailMode === ConfirmEmailMode.Success;
    }
}
