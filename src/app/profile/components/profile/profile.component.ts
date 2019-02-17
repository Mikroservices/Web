import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { User } from 'src/app/core/models/user';
import { SpinnerService } from 'src/app/shared/spinner/services/spinner.service';
import { UsersService } from 'src/app/core/services/http/users.service';


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
        private usersService: UsersService,
        private spinnerService: SpinnerService,
        private toastrService: ToastrService) { }

    ngOnInit() {
        this.route.params.subscribe(async (params) => {
            this.spinnerService.show();
            this.userName = params['userName'];

            try {
                this.user = await this.usersService.profile(this.userName);
            } catch {
                this.toastrService.error('Error during downloading user profile.');
                this.router.navigate(['/home']);
            } finally {
                this.spinnerService.hide();
            }
        });
    }
}
