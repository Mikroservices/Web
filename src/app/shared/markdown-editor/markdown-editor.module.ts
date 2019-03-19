import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMdModule } from 'ngx-md';
import { ContenteditableModule } from 'ng-contenteditable';
import { AutosizeModule } from 'ngx-autosize';
import { HighlightModule } from 'ngx-highlightjs';
import { FileUploadModule } from 'ng2-file-upload';

import { PreviewComponent } from './components/preview/preview.component';
import { EditorComponent } from './components/editor/editor.component';
import { FilesComponent } from './components/files/files.component';
import { MarkdownEditorComponent } from './components/markdown-editor/markdown-editor.component';
import { BootstrapElementsDirective } from './directives/bootstrap-elements.directive';


@NgModule({
    declarations: [
        PreviewComponent,
        EditorComponent,
        FilesComponent,
        MarkdownEditorComponent,
        BootstrapElementsDirective
    ],
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule,
        FormsModule,
        BrowserAnimationsModule,
        TabsModule,
        NgxMdModule,
        ContenteditableModule,
        AutosizeModule,
        HighlightModule,
        FileUploadModule
    ],
    exports: [
        PreviewComponent,
        EditorComponent,
        FilesComponent,
        MarkdownEditorComponent
    ]
})
export class MarkdownEditorModule { }
