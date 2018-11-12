import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

@NgModule({
    declarations: [
        ForgotPasswordComponent,
        ResetPasswordComponent
    ],
    imports: [
        SharedModule
    ]
})
export class ForgotPasswordModule { }
