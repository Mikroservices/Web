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
    changePasswordErrorMessage: string;

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

    async ngOnInit(): Promise<void> {
        try {
            this.spinnerService.show();
            this.settingsMode = SettingsMode.Settings;
            this.user = new User();
            this.changePassword = new ChangePassword();

            const userFromToken = this.authorizationService.getUser();
            this.user = await this.usersService.profile(userFromToken.userName);
        } catch {
            this.toastrService.error('Error during downloading user settings.');
            this.router.navigate(['/home']);
        } finally {
            this.spinnerService.hide();
        }
    }

    async onSubmit(): Promise<void> {
        try {
            this.settingsMode = SettingsMode.Submitting;
            await this.usersService.update(this.user.userName, this.user);
            this.settingsMode = SettingsMode.Success;
            this.authorizationService.refreshAccessToken();
            this.toastrService.success('Settings was saved.');
        } catch (error) {
            console.error(error);
            this.errorMessage = 'Unexpected error occurred. Please try again.';
            this.settingsMode = SettingsMode.Error;
        }
    }

    async submitChangePassword(): Promise<void> {
        try {
            await this.accountService.changePassword(this.changePassword);
            this.changePasswordModalRef.hide();
            this.toastrService.success('Password was changed.');
        } catch {
            this.changePasswordErrorMessage = 'Unexpected error occurred. Please try again.';
        }
    }

    closeChangePassword(): void {
        this.changePassword.currentPassword = '';
        this.changePassword.newPassword = '';
        this.changePasswordErrorMessage = null;

        this.changePasswordModalRef.hide();
    }

    async onDeleteAccount(): Promise<void> {
        try {
            await this.usersService.delete(this.userNameToDelete);
            this.deleteAccountModalRef.hide();
            this.toastrService.success('Your account was deleted.');

            this.authorizationService.signOut();
            this.router.navigate(['/home']);
        } catch {
            this.errorMessage = 'Unexpected error occurred. Please try again.';
        }
    }

    openChangePasswordModal(template: TemplateRef<any>) {
        this.changePasswordModalRef = this.modalService.show(template);
    }

    openDeleteAccountModal(template: TemplateRef<any>) {
        this.deleteAccountModalRef = this.modalService.show(template);
    }

    isSettingsMode(): boolean {
        return this.settingsMode === SettingsMode.Settings;
    }

    isSubmittingMode(): boolean {
        return this.settingsMode === SettingsMode.Submitting;
    }

    isSuccessMode(): boolean {
        return this.settingsMode === SettingsMode.Success;
    }

    isErrorMode(): boolean {
        return this.settingsMode === SettingsMode.Error;
    }
}
