import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home/home.page';
import { AccessForbiddenPage } from './errors/access-forbidden/access-forbidden.page';
import { PageNotFoundPage } from './errors/page-not-found/page-not-found.page';
import { LoggedOutGuardService } from '../services/authorization/logged-out-guard.service';
import { LoginPage } from './login/login.page';
import { LoginCallbackPage } from './login-callback/login-callback.page';
import { RegisterPage } from './register/register.page';

const routes: Routes = [
    { path: 'login', component: LoginPage, canActivate: [ LoggedOutGuardService ] },
    { path: 'login-callback', component: LoginCallbackPage, canActivate: [ LoggedOutGuardService ] },
    // { path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [ LoggedOutGuardService ] },
    // { path: 'reset-password', component: ResetPasswordComponent, canActivate: [ LoggedOutGuardService ] },
    { path: 'register', component: RegisterPage, canActivate: [ LoggedOutGuardService ] },
    // { path: 'confirm-email', component: ConfirmEmailComponent, canActivate: [ LoggedOutGuardService ] },
    // { path: 'profile/:userName', component: ProfileComponent, canActivate: [ AuthorizationGuardService ]  },
    // { path: 'settings', component: SettingsComponent, canActivate: [ AuthorizationGuardService ] },
    { path: 'home', component: HomePage },
    { path: 'access-forbidden', component: AccessForbiddenPage },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', component: PageNotFoundPage }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
