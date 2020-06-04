import { NgModule } from '@angular/core';

import { PagesRoutingModule } from './pages-routing.module';
import { HomePage } from './home/home.page';
import { ComponentsModule } from '../components/components.module';
import { PageNotFoundPage } from './errors/page-not-found/page-not-found.page';
import { AccessForbiddenPage } from './errors/access-forbidden/access-forbidden.page';
import { LoginPage } from './login/login.page';
import { PipesModule } from '../pipes/pipes.module';
import { RegisterPage } from './register/register.page';

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
        AccessForbiddenPage,
        RegisterPage
    ],
    exports: [
        ComponentsModule,
        PipesModule,
        PagesRoutingModule,
        HomePage,
        LoginPage,
        PageNotFoundPage,
        AccessForbiddenPage,
        RegisterPage
    ]
})
export class PagesModule { }
