import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContenteditableModule } from 'ng-contenteditable';

import { GravatarModule } from './gravatar/gravatar.module';
import { SpinnerModule } from './spinner/spinner.module';
import { StoriesModule } from './stories/stories.module';
import { UserCardModule } from './user-card/user-card.module';
import { ValidationsModule } from './validations/validations.module';
import { TextEditorModule } from './text-editor/text-editor.module';

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
        ContenteditableModule,
        GravatarModule,
        SpinnerModule,
        StoriesModule,
        UserCardModule,
        ValidationsModule,
        TextEditorModule
    ]
})
export class SharedModule { }
