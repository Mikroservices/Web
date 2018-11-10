import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../shared/models/user';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit {

    user: User = new User();
    isSubmitting: Boolean = false;

    constructor(private http: HttpClient) { }

    ngOnInit() {
    }

    async onSubmit() {
        this.isSubmitting = true;
        // await this.http.post('', this.user);
        // browser.driver.sleep(10000);

        await this.delay(3000);
        this.isSubmitting = false;
    }

    async delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }
}
