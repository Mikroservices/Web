import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NgxMdService } from 'ngx-md';

@Component({
    selector: 'app-preview',
    templateUrl: './preview.component.html',
    styleUrls: ['./preview.component.less']
})
export class PreviewComponent implements OnInit, OnChanges {

    @Input() storyTitle: string;
    @Input() storyText: string;

    rendered: SafeHtml;

    constructor(
        private sanitizer: DomSanitizer,
        private markdown: NgxMdService
    ) {}

    ngOnChanges(_: SimpleChanges): void {
        this.load();
    }

    ngOnInit() {
        this.load();
    }

    private load() {
        const html = this.markdown.compile(this.storyText);
        this.rendered = this.sanitizer.bypassSecurityTrustHtml(html);
    }
}
