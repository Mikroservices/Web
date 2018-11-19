import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TextEditorDirective } from './directives/text-editor.directive';
export * from './directives/text-editor.directive';

@NgModule({
    declarations: [
        TextEditorDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
        TextEditorDirective
    ]
})
export class TextEditorModule { }
