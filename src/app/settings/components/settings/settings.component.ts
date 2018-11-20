import { Component, OnInit, TemplateRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { SettingsMode } from '../../models/settings-mode';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/shared/models/user';

import { AuthorizationService } from 'src/app/core/services/authorization/authorization.service';
import { ToastrService } from 'ngx-toastr';
import { ChangePassword } from '../../models/change-password';
import { Router } from '@angular/router';
import { SpinnerService } from 'src/app/shared/spinner/services/spinner.service';

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
        private authorizationService: AuthorizationService,
        private toastrService: ToastrService,
        private modalService: BsModalService,
        private router: Router,
        private spinnerService: SpinnerService) { }

    ngOnInit() {
        this.spinnerService.show();
        this.settingsMode = SettingsMode.Settings;
        this.user = new User();
        this.changePassword = new ChangePassword();

        let userFromToken = this.authorizationService.getUser();
        this.httpClient.get<User>(environment.usersService + '/users/@' + userFromToken.userName).subscribe(user => {
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

        this.httpClient.put<User>(environment.usersService + '/users/@' + this.user.userName, this.user).subscribe(
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
