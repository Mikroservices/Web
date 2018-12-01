import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UniqueEmailValidatorDirective } from './directives/unique-email-validator.directive';
import { UniqueUserNameValidatorDirective } from './directives/unique-user-name-validator.directive';
import { PasswordValidatorDirective } from './directives/password-validator.directive';

@NgModule({
    declarations: [
        UniqueEmailValidatorDirective,
        UniqueUserNameValidatorDirective,
        PasswordValidatorDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
        UniqueEmailValidatorDirective,
        UniqueUserNameValidatorDirective,
        PasswordValidatorDirective
    ]
})
export class ValidationsModule { }
