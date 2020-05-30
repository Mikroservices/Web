import { NgModule } from '@angular/core';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { AngularMaterialModule } from './angular-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import { HeaderComponent } from './core/header/header.component';

@NgModule({
    declarations: [
        HeaderComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        BrowserTransferStateModule,
        FlexLayoutModule,
        AngularMaterialModule,
        RouterModule
    ],
    exports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        BrowserTransferStateModule,
        FlexLayoutModule,
        AngularMaterialModule,
        RouterModule,
        HeaderComponent
    ]
})
export class ComponentsModule { }
