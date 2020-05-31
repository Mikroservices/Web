import { NgModule } from '@angular/core';

import { PagesRoutingModule } from './pages-routing.module';
import { HomePage } from './home/home.page';
import { ComponentsModule } from '../components/components.module';
import { PageNotFoundPage } from './errors/page-not-found/page-not-found.page';
import { AccessForbiddenPage } from './errors/access-forbidden/access-forbidden.page';
import { LoginPage } from './login/login.page';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
    imports: [
        ComponentsModule,
        PipesModule,
        PagesRoutingModule
    ],
    declarations: [
        HomePage,
        LoginPage,
        PageNotFoundPage,
        AccessForbiddenPage
    ],
    exports: [
        ComponentsModule,
        PipesModule,
        PagesRoutingModule,
        HomePage,
        LoginPage,
        PageNotFoundPage,
        AccessForbiddenPage
    ]
})
export class PagesModule { }
