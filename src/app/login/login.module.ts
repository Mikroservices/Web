import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';

@NgModule({
    declarations: [
        LoginComponent,
        ForgotPasswordComponent
    ],
    imports: [
        SharedModule
    ]
})
export class LoginModule { }
