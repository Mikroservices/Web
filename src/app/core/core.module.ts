import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

@NgModule({
    declarations: [
        HomeComponent,
        PageNotFoundComponent
    ],
    imports: [
        SharedModule
    ]
})
export class CoreModule { }
