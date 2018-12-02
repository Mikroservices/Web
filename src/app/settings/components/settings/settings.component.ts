import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ToastrService } from 'ngx-toastr';

import { SettingsMode } from '../../models/settings-mode';
import { ChangePassword } from '../../../core/models/change-password';
import { User } from 'src/app/core/models/user';
import { AuthorizationService } from 'src/app/core/services/authorization/authorization.service';
import { SpinnerService } from 'src/app/shared/spinner/services/spinner.service';
import { AccountService } from 'src/app/core/services/http/account.service';
import { UsersService } from 'src/app/core/services/http/users.service';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.less']
})
export class SettingsComponent implements OnInit {

    user: User;
    changePassword: ChangePassword;
    userNameToDelete: string;
    settingsMode: SettingsMode;
    errorMessage: string;

    changePasswordModalRef: BsModalRef;
    deleteAccountModalRef: BsModalRef;

    constructor(
        private usersService: UsersService,
        private accountService: AccountService,
        private authorizationService: AuthorizationService,
        private toastrService: ToastrService,
        private modalService: BsModalService,
        private router: Router,
        private spinnerService: SpinnerService
    ) { }

    ngOnInit() {
        this.spinnerService.show();
        this.settingsMode = SettingsMode.Settings;
        this.user = new User();
        this.changePassword = new ChangePassword();

        let userFromToken = this.authorizationService.getUser();

        this.usersService.profile(userFromToken.userName).subscribe(user => {
            this.user = user;
        },
        () => {
            this.toastrService.error('Error during downloading user settings.');
                
            this.spinnerService.hide();
            this.router.navigate(['/home']);
        },
        () => {
            this.spinnerService.hide();
        });
    }

    async onSubmit() {
        this.settingsMode = SettingsMode.Submitting;

        this.usersService.update(this.user.userName, this.user).subscribe(
            () => {
                this.settingsMode = SettingsMode.Success;
                this.authorizationService.refreshAccessToken();
                this.toastrService.success('Settings was saved.');
            },
            () => {
                this.errorMessage = 'Unexpected error occurred. Please try again.';
                this.settingsMode = SettingsMode.Error;
            }
        );
    }

    onChangePassword() {
        this.accountService.changePassword(this.changePassword).subscribe(
            () => {
                this.changePasswordModalRef.hide();
                this.toastrService.success('Password was changed.');
            },
            () => {
                this.errorMessage = 'Unexpected error occurred. Please try again.';
            }
        );
    }

    onDeleteAccount() {
        this.usersService.delete(this.userNameToDelete).subscribe(
            () => {
                this.deleteAccountModalRef.hide();
                this.toastrService.success('Your account was deleted.');

                this.authorizationService.signOut();
                this.router.navigate(['/home']);
            },
            () => {
                this.errorMessage = 'Unexpected error occurred. Please try again.';
            }
        );
    }

    openChangePasswordModal(template: TemplateRef<any>) {
        this.changePasswordModalRef = this.modalService.show(template);
    }

    openDeleteAccountModal(template: TemplateRef<any>) {
        this.deleteAccountModalRef = this.modalService.show(template);
    }

    isSettingsMode(): Boolean {
        return this.settingsMode === SettingsMode.Settings;
    }

    isSubmittingMode(): Boolean {
        return this.settingsMode === SettingsMode.Submitting;
    }

    isSuccessMode(): Boolean {
        return this.settingsMode === SettingsMode.Success;
    }

    isErrorMode(): Boolean {
        return this.settingsMode === SettingsMode.Error;
    }

}
