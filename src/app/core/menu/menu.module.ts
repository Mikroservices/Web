import { NgModule } from '@angular/core';

import { NavbarComponent } from './components/navbar/navbar.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { GravatarModule } from 'ngx-gravatar';

@NgModule({
    declarations: [
        NavbarComponent
    ],
    imports: [
        SharedModule,
        BsDropdownModule.forRoot(),
        GravatarModule
    ],
    exports: [
        NavbarComponent
    ]
})
export class MenuModule { }
