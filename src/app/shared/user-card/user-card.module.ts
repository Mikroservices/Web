import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserCardComponent } from './components/user-card/user-card.component';
import { GravatarModule } from '../gravatar/gravatar.module';

@NgModule({
    declarations: [
        UserCardComponent
    ],
    imports: [
        CommonModule,
        GravatarModule
    ],
    exports: [
        UserCardComponent
    ]
})
export class UserCardModule { }
