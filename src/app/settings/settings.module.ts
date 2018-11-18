import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';

import { SharedModule } from '../shared/shared.module';
import { SettingsComponent } from './components/settings/settings.component';

@NgModule({
    declarations: [
        SettingsComponent
    ],
    imports: [
        SharedModule,
        ModalModule.forRoot()
    ]
})
export class SettingsModule { }
