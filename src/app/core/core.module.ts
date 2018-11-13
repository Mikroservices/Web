import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ErrorsModule } from './errors/errors.module';
import { MenuModule } from './menu/menu.module';

@NgModule({
    declarations: [
    ],
    imports: [
        SharedModule
    ],
    exports: [
        ErrorsModule,
        MenuModule
    ]
})
export class CoreModule { }
