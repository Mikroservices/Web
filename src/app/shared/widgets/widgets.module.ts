import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PasswordComponent } from './password/password.component';
import { ValidationsModule } from '../validations/validations.module';

@NgModule({
    declarations: [
        PasswordComponent
    ],
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule,
        FormsModule,
        BrowserAnimationsModule,
        ValidationsModule
    ],
    exports: [
        PasswordComponent
    ]
})
export class WidgetsModule { }
