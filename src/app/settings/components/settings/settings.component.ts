import { Component, OnInit, TemplateRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { SettingsMode } from '../../models/settings-mode';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/shared/models/user';

import { UserService } from 'src/app/core/services/user/user.service';
import { ToastrService } from 'ngx-toastr';
import { ChangePassword } from '../../models/change-password';
import { Router } from '@angular/router';

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
        private httpClient: HttpClient,
        private userService: UserService,
        private toastrService: ToastrService,
        private modalService: BsModalService,
        private router: Router) { }

    ngOnInit() {
        this.settingsMode = SettingsMode.Settings;
        this.user = new User();
        this.changePassword = new ChangePassword();

        let userFromToken = this.userService.getUser();
        this.httpClient.get<User>(environment.usersService + '/users/@' + userFromToken.userName).subscribe(user => {
            this.user = user;
        });
    }

    async onSubmit() {
        this.settingsMode = SettingsMode.Submitting;

        this.httpClient.put<User>(environment.usersService + '/users/@' + this.user.userName, this.user).subscribe(
            () => {
                this.settingsMode = SettingsMode.Success;
                this.userService.refreshAccessToken();
                this.toastrService.success('Settings was saved.');
            },
            () => {
                this.errorMessage = 'Unexpected error occurred. Please try again.';
                this.settingsMode = SettingsMode.Error;
            }
        );
    }

    onChangePassword() {
        this.httpClient.post<User>(environment.usersService + '/account/change-password', this.changePassword).subscribe(
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
        this.httpClient.delete<User>(environment.usersService + '/users/@' + this.userNameToDelete).subscribe(
            () => {
                this.deleteAccountModalRef.hide();
                this.toastrService.success('Your account was deleted.');

                this.userService.signOut();
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
