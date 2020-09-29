import { NgModule } from '@angular/core';

import { PagesRoutingModule } from './pages-routing.module';
import { HomePage } from './home/home.page';
import { ComponentsModule } from '../components/components.module';
import { PageNotFoundPage } from './errors/page-not-found/page-not-found.page';
import { AccessForbiddenPage } from './errors/access-forbidden/access-forbidden.page';
import { LoginPage } from './login/login.page';
import { PipesModule } from '../pipes/pipes.module';
import { RegisterPage } from './register/register.page';
import { ForgotPasswordPage } from './forgot-password/forgot-password.page';
import { ResetPasswordPage } from './reset-password/reset-password.page';
import { ConfirmEmailPage } from './confirm-email/confirm-email.page';

@NgModule({
    imports: [
        ComponentsModule,
        PipesModule,
        PagesRoutingModule
    ],
    declarations: [
        HomePage,
        LoginPage,
        PageNotFoundPage,
        AccessForbiddenPage,
        RegisterPage,
        ForgotPasswordPage,
        ResetPasswordPage,
        ConfirmEmailPage
    ],
    exports: [
        ComponentsModule,
        PipesModule,
        PagesRoutingModule,
        HomePage,
        LoginPage,
        PageNotFoundPage,
        AccessForbiddenPage,
        RegisterPage,
        ForgotPasswordPage,
        ResetPasswordPage,
        ConfirmEmailPage
    ]
})
export class PagesModule { }
