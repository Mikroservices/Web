import {
    Directive,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    Renderer,
    ɵlooseIdentical
} from '@angular/core';
import * as MediumEditor from 'medium-editor';

@Directive({
    // tslint:disable-next-line: directive-selector
    selector: 'app-text-editor'
})
export class TextEditorDirective implements OnInit, OnChanges, OnDestroy {

    private lastViewModel: string;
    private element: HTMLElement;
    private editor: any;

    @Input() model: any;
    @Input() placeholder: string;
    @Output() modelChange = new EventEmitter();

    constructor(private el: ElementRef) { }

    ngOnInit() {
        this.element = this.el.nativeElement;
        this.element.innerHTML = '<div class="me-editable">' + this.model + '</div>';

        const options = {
            toolbar: {
                buttons: [
                    'bold',
                    'italic',
                    'strikethrough',
                    'orderedlist',
                    'unorderedlist',
                    'anchor',
                    'h1',
                    'h2',
                    'h3',
                    'quote']
            },
            placeholder: {
                text: this.placeholder
            },
            imageDragging: false,
            extensions: {
                'imageDragging': {}
            }
        };

        // Global MediumEditor
        this.editor = new MediumEditor('.me-editable', options);
        this.editor.subscribe('editableInput', (event, editable) => {
            this.updateModel();
        });
    }

    refreshView() {
        if (this.editor) {
            this.editor.setContent(this.model);
        }
    }

    ngOnChanges(changes): void {
        if (this.isPropertyUpdated(changes, this.lastViewModel)) {
            this.lastViewModel = this.model;
            this.refreshView();
        }
    }

    updateModel(): void {
        let value = this.editor.getContent();
        value = value.replace(/&nbsp;/g, '').trim();
        this.lastViewModel = value;
        this.modelChange.emit(value);
    }

    ngOnDestroy(): void {
        this.editor.destroy();
    }

    isPropertyUpdated(changes, viewModel) {
        if (!changes.hasOwnProperty('model')) { return false; }

        const change = changes.model;

        if (change.isFirstChange()) {
            return true;
        }

        return !ɵlooseIdentical(viewModel, change.currentValue);
    }
}
