import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { switchMap } from 'rxjs/operators';

import { User } from 'src/app/shared/models/user';
import { environment } from 'src/environments/environment';
import { SpinnerService } from 'src/app/shared/spinner/services/spinner.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.less']
})
export class ProfileComponent implements OnInit {

    user: User;
    private userName: string;

    constructor(
        private route: ActivatedRoute, 
        private httpClient: HttpClient,
        private spinnerService: SpinnerService) { }

    ngOnInit() {
        this.spinnerService.show();

        this.route.params.subscribe(params => {
            this.userName = params['userName'];
            this.httpClient.get<User>(environment.usersService +  '/users/' + this.userName).subscribe(user => {
                this.user = user;

                this.spinnerService.hide();
            });
        })
    }
}
