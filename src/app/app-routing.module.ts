import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/components/home/home.component';
import { PageNotFoundComponent } from './core/errors/components/page-not-found/page-not-found.component';
import { LoginComponent } from './login/components/login/login.component';
import { RegisterComponent } from './register/components/register/register.component';
import { ConfirmEmailComponent } from './register/components/confirm-email/confirm-email.component';
import { ForgotPasswordComponent } from './forgot-password/components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './forgot-password/components/reset-password/reset-password.component';
import { ProfileComponent } from './profile/components/profile/profile.component';
import { SettingsComponent } from './settings/components/settings/settings.component';
import { AuthorizationGuardService } from './core/services/user/authorization-guard.service';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'reset-password', component: ResetPasswordComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'confirm-email', component: ConfirmEmailComponent },
    { path: 'profile/:userName', component: ProfileComponent },
    { path: 'settings', component: SettingsComponent, canActivate: [AuthorizationGuardService] },
    { path: 'home', component: HomeComponent },
    { path: '',   redirectTo: '/home', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
