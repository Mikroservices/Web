import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

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
        HttpClientModule,
    ]
})
export class SharedModule { }
