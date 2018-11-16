import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { UniqueUserNameValidatorDirective } from './validations/unique-user-name-validator.directive';
import { UniqueEmailValidatorDirective } from './validations/unique-email-validator.directive';

@NgModule({
    declarations: [
        UniqueEmailValidatorDirective,
        UniqueUserNameValidatorDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
        BrowserModule,
        RouterModule,
        FormsModule,
        HttpClientModule,
        UniqueEmailValidatorDirective,
        UniqueUserNameValidatorDirective
    ]
})
export class SharedModule { }
