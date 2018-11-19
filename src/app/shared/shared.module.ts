import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { GravatarModule } from './gravatar/gravatar.module';
import { SpinnerModule } from './spinner/spinner.module';
import { StoriesModule } from './stories/stories.module';
import { UserCardModule } from './user-card/user-card.module';
import { ValidationsModule } from './validations/validations.module';

@NgModule({
    declarations: [
    ],
    imports: [
        CommonModule
    ],
    exports: [
        BrowserModule,
        RouterModule,
        FormsModule,
        BrowserAnimationsModule,
        HttpClientModule,
        GravatarModule,
        SpinnerModule,
        StoriesModule,
        UserCardModule,
        ValidationsModule
    ]
})
export class SharedModule { }
