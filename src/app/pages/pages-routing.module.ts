import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home/home.page';
import { AccessForbiddenPage } from './errors/access-forbidden/access-forbidden.page';
import { PageNotFoundPage } from './errors/page-not-found/page-not-found.page';

const routes: Routes = [
    // { path: 'login', component: LoginComponent, canActivate: [ LoggedInGuardService ] },
    // { path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [ LoggedInGuardService ] },
    // { path: 'reset-password', component: ResetPasswordComponent, canActivate: [ LoggedInGuardService ] },
    // { path: 'register', component: RegisterComponent, canActivate: [ LoggedInGuardService ] },
    // { path: 'confirm-email', component: ConfirmEmailComponent, canActivate: [ LoggedInGuardService ] },
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
