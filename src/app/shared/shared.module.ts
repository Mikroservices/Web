import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { UniqueUserNameValidatorDirective } from './validations/unique-user-name-validator.directive';
import { UniqueEmailValidatorDirective } from './validations/unique-email-validator.directive';
import { SpinnerComponent } from './spinner/components/spinner.component';
import { GravatarComponent } from './gravatar/gravatar.component';
import { StoryItemComponent } from './stories/components/story-item/story-item.component';

@NgModule({
    declarations: [
        UniqueEmailValidatorDirective,
        UniqueUserNameValidatorDirective,
        SpinnerComponent,
        GravatarComponent,
        StoryItemComponent
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
        UniqueEmailValidatorDirective,
        UniqueUserNameValidatorDirective,
        SpinnerComponent,
        GravatarComponent,
        StoryItemComponent
    ]
})
export class SharedModule { }
