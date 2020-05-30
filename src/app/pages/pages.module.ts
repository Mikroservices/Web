import { NgModule } from '@angular/core';

import { PagesRoutingModule } from './pages-routing.module';
import { HomePage } from './home/home.page';
import { ComponentsModule } from '../components/components.module';
import { PageNotFoundPage } from './errors/page-not-found/page-not-found.page';
import { AccessForbiddenPage } from './errors/access-forbidden/access-forbidden.page';

@NgModule({
    imports: [
        ComponentsModule,
        PagesRoutingModule
    ],
    declarations: [
        HomePage,
        PageNotFoundPage,
        AccessForbiddenPage
    ],
    exports: [
        ComponentsModule,
        PagesRoutingModule,
        HomePage,
        PageNotFoundPage,
        AccessForbiddenPage
    ]
})
export class PagesModule { }
