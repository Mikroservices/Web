import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-markdown-editor',
    templateUrl: './markdown-editor.component.html'
})
export class MarkdownEditorComponent {
    @Input() storyTitle: string;
    @Output() storyTitleChange = new EventEmitter();

    @Input() storyText: string;
    @Output() storyTextChange = new EventEmitter();

    storyTitleChanged(storyTitle: string): void {
        this.storyTitleChange.emit(storyTitle);
    }

    storyTextChanged(storyText: string): void {
        console.log('storyTextChanged...');
        this.storyTextChange.emit(storyText);
    }
}
