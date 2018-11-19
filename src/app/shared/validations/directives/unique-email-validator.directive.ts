import { Directive } from '@angular/core';
import { NG_ASYNC_VALIDATORS, ValidationErrors, AsyncValidator, AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { of, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { BooleanResult } from '../../models/boolean-result';
import { environment } from 'src/environments/environment';

@Directive({
    selector: '[appUniqueEmail]',
    providers: [
        { provide: NG_ASYNC_VALIDATORS, useExisting: UniqueEmailValidatorDirective, multi: true }
    ]
})
export class UniqueEmailValidatorDirective implements AsyncValidator {

    constructor(private httpClient: HttpClient) {
    }

    validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
        return timer(500).pipe(
            switchMap(() => {
                if (!control.value) {
                    return of(null);
                }

                return this.httpClient.get<BooleanResult>(environment.usersService + '/register/email/' + control.value).pipe(
                    map(response => {
                        if (response.result) {
                            return { appUniqueEmail: { error: 'Email already connected to other account.', actualValue: control.value } };
                        }

                        return null;
                    })
                );
            })
        );
    }
}
