import { Directive } from '@angular/core';
import { NG_ASYNC_VALIDATORS, ValidationErrors, AsyncValidator, AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { BooleanResult } from '../models/boolean-result';
import { of, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Directive({
    selector: '[appUniqueUserName]',
    providers: [
        { provide: NG_ASYNC_VALIDATORS, useExisting: UniqueUserNameValidatorDirective, multi: true }
    ]
})
export class UniqueUserNameValidatorDirective implements AsyncValidator {

    constructor(private httpClient: HttpClient) {
    }

    validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
        return timer(500).pipe(
            switchMap(() => {
                if (!control.value) {
                    return of(null);
                }

                return this.httpClient.get<BooleanResult>(environment.usersService + '/register/userName/' + control.value).pipe(
                    map(response => {
                        if (response.result) {
                            return { appUniqueUserName: { error: 'User name is already taken.', actualValue: control.value } };
                        }

                        return null;
                    })
                );
            })
        );
    }
}
