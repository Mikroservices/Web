import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';

@NgModule({
    declarations: [
        LoginPageComponent,
        ForgotPasswordComponent
    ],
    imports: [
        SharedModule
    ]
})
export class LoginModule { }
