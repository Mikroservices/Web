import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

function validateUserNameFactory(httpClient: HttpClient) {
    return (c: FormControl) => {
        console.log('Validation: ' + c.value);
        return c.value === 'marcin'
    };
}

@Directive({
    selector: '[validateUserName][ngModel]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => UserNameValidatorDirective), multi: true }
    ]
})
export class UserNameValidatorDirective {

    validator: Function;

    constructor(httpClient: HttpClient) {
        this.validator = validateUserNameFactory(httpClient);
    }

    validate(c: FormControl) {
        return this.validator(c);
    }
}