import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingBarModule } from '@ngx-loading-bar/core';

@NgModule({
    declarations: [
    ],
    imports: [
        CommonModule,
        LoadingBarModule
    ],
    exports: [
        LoadingBarModule
    ]
})
export class SpinnerModule { }
