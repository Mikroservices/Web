import { NgModule } from '@angular/core';
import { ProfileComponent } from './components/profile/profile.component';
import { SharedModule } from '../shared/shared.module';
import { TabsModule } from 'ngx-bootstrap/tabs';

@NgModule({
    declarations: [
        ProfileComponent
    ],
    imports: [
        SharedModule,
        TabsModule.forRoot()
    ]
})
export class ProfileModule { }
