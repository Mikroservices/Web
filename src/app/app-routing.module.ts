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
import { AuthorizationGuardService } from './core/services/authorization/authorization-guard.service';
import { LoggedInGuardService } from './core/services/authorization/logged-in-guard.service';
import { StoryEditComponent } from './stories/components/story-edit/story-edit.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent, canActivate: [ LoggedInGuardService ] },
    { path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [ LoggedInGuardService ] },
    { path: 'reset-password', component: ResetPasswordComponent, canActivate: [ LoggedInGuardService ] },
    { path: 'register', component: RegisterComponent, canActivate: [ LoggedInGuardService ] },
    { path: 'confirm-email', component: ConfirmEmailComponent, canActivate: [ LoggedInGuardService ] },
    { path: 'profile/:userName', component: ProfileComponent },
    { path: 'stories/new', component: StoryEditComponent },
    { path: 'settings', component: SettingsComponent, canActivate: [ AuthorizationGuardService ] },
    { path: 'home', component: HomeComponent },
    { path: '',   redirectTo: '/home', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
