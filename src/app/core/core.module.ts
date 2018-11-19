import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ErrorsModule } from './errors/errors.module';
import { MenuModule } from './menu/menu.module';
import { FooterModule } from './footer/footer.module';

@NgModule({
    declarations: [],
    imports: [
        SharedModule
    ],
    exports: [
        ErrorsModule,
        MenuModule,
        FooterModule
    ]
})
export class CoreModule { }
