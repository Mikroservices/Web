import { NgModule } from '@angular/core';
import { ProfileComponent } from './components/profile/profile.component';
import { SharedModule } from '../shared/shared.module';
import { GravatarModule } from 'ngx-gravatar';
import { TabsModule } from 'ngx-bootstrap/tabs';

@NgModule({
    declarations: [
        ProfileComponent
    ],
    imports: [
        SharedModule,
        GravatarModule,
        TabsModule.forRoot()
    ]
})
export class ProfileModule { }
