import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { UserNameValidatorDirective } from './validations/user-name-validator.directive';
import { EmailConnectedValidatorDirective } from './validations/email-connected-validator.directive';

@NgModule({
    declarations: [
        UserNameValidatorDirective,
        EmailConnectedValidatorDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
        BrowserModule,
        RouterModule,
        FormsModule,
        HttpClientModule,
        EmailConnectedValidatorDirective,
        UserNameValidatorDirective
    ]
})
export class SharedModule { }
