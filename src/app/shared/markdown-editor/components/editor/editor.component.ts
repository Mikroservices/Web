import { Component, Input, EventEmitter, Output } from '@angular/core';
import { text } from '@angular/core/src/render3';

@Component({
    selector: 'app-editor',
    templateUrl: './editor.component.html'
})
export class EditorComponent {

    @Input() storyTitle: string;
    @Output() storyTitleChange = new EventEmitter();

    @Input() storyText: string;
    @Output() storyTextChange = new EventEmitter();

    storyTitleChanged(storyTitle: string): void {
        this.storyTitleChange.emit(storyTitle);
    }

    storyTextChanged(storyText: string): void {
        this.storyTextChange.emit(storyText);
    }

    storyTitleBlur(): void {
    }

    storyTextBlur(): void {
    }
}
