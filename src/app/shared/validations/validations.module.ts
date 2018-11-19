import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UniqueEmailValidatorDirective } from './directives/unique-email-validator.directive';
import { UniqueUserNameValidatorDirective } from './directives/unique-user-name-validator.directive';

@NgModule({
    declarations: [
        UniqueEmailValidatorDirective,
        UniqueUserNameValidatorDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
        UniqueEmailValidatorDirective,
        UniqueUserNameValidatorDirective
    ]
})
export class ValidationsModule { }
