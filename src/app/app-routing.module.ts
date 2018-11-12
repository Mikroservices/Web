import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import { HomeComponent } from './core/components/home/home.component';

import { LoginComponent } from './login/components/login/login.component';
import { ForgotPasswordComponent } from './login/components/forgot-password/forgot-password.component';

import { RegisterComponent } from './register/components/register/register.component';
import { ConfirmEmailComponent } from './register/components/confirm-email/confirm-email.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'confirm-email', component: ConfirmEmailComponent },
    { path: 'home', component: HomeComponent },
    { path: '',   redirectTo: '/home', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
