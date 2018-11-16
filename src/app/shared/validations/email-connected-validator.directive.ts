import { Directive } from '@angular/core';
import { NG_VALIDATORS, ValidationErrors, AsyncValidator, AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { BooleanResult } from '../models/boolean-result';

@Directive({
    selector: '[appEmailConnected]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: EmailConnectedValidatorDirective, multi: true }
    ]
})
export class EmailConnectedValidatorDirective implements AsyncValidator {

    constructor(private httpClient: HttpClient) {
    }

    validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
        console.log('Validation: ' + control.value);
        return this.httpClient.get<BooleanResult>('http://localhost:8001/register/email/' + control.value).toPromise().then(response => {

            console.log(control.errors);
            console.log('valid: ' + control.valid)

            if (response.result) {
                console.log('error');
                return { appEmailConnected: { error: 'Email already connected to other account.', actualValue: control.value }};
            }

            return null;
        }).catch(() => {
            return null;
        });
    }
}
