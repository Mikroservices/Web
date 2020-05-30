import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { MAT_CHECKBOX_CLICK_ACTION } from '@angular/material/checkbox';

import { environment } from 'src/environments/environment';
import { AppComponent } from './app.component';
import { PersistanceService } from './services/persistance/persistance.service';
import { AuthorizationService } from './services/authorization/authorization.service';
import { PagesModule } from './pages/pages.module';

export function jwtOptionsFactory(persistanceService: PersistanceService) {
    return {
        tokenGetter: () => {
            return persistanceService.getAccessToken();
        },
        whitelistedDomains: [environment.usersService],
        blacklistedRoutes: []
    };
}

export function appInitialization(authorizationService: AuthorizationService) {
    return () => authorizationService.refreshAccessToken();
}

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        JwtModule.forRoot({
            jwtOptionsProvider: {
                provide: JWT_OPTIONS,
                useFactory: jwtOptionsFactory,
                deps: [PersistanceService]
            }
        }),
        PagesModule
    ],
    providers: [
        { provide: MAT_CHECKBOX_CLICK_ACTION, useValue: 'check' },
        {
            provide: APP_INITIALIZER,
            useFactory: appInitialization,
            deps: [AuthorizationService],
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
