import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

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
        private router: Router,
        private httpClient: HttpClient,
        private spinnerService: SpinnerService,
        private toastrService: ToastrService) { }

    ngOnInit() {
        this.spinnerService.show();

        this.route.params.subscribe(params => {
            this.userName = params['userName'];
            this.httpClient.get<User>(environment.usersService +  '/users/' + this.userName).subscribe(user => {
                this.user = user;
            },
            () => {
                this.toastrService.error('Error during downloading user profile.');
                
                this.spinnerService.hide();
                this.router.navigate(['/home']);
            },
            () => {
                this.spinnerService.hide();
            });
        })
    }
}
