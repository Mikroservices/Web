import { Directive, Input, Inject, OnInit, OnDestroy, Renderer2, ElementRef, NgZone, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { element } from '@angular/core/src/render3';

@Directive({
    selector: '[appBootstrapElements]'
})
export class BootstrapElementsDirective implements OnInit, OnDestroy {

    @Input('appBootstrapElements') selector: string;
    private observer: any;

    constructor(private zone: NgZone,
        private element: ElementRef,
        private renderer: Renderer2,
        @Inject(PLATFORM_ID) private platformId: Object) {
    }

    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            this.zone.runOutsideAngular(() => {
                this.observer = new MutationObserver(() =>
                    this.addBootstrapClass(this.selector)
                );

                this.observer.observe(this.element.nativeElement, {
                    childList: true
                });
            });
        }
    }

    ngOnDestroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
    }

    private addBootstrapClass(selector: string) {
        const elementsToAddTableClass = this.element.nativeElement.querySelectorAll(selector || 'table');
        for (const item of elementsToAddTableClass) {
            this.addTableClass(item);
        }

        const elementsToChangeImageLinks = this.element.nativeElement.querySelectorAll(selector || 'img');
        for (const item of elementsToChangeImageLinks) {
            this.addLinkToImage(item);
        }
    }

    private addTableClass(elementItem: HTMLTableElement) {
        this.renderer.addClass(elementItem, 'table');
    }

    private addLinkToImage(elementItem: HTMLImageElement) {
        const imageName = elementItem.getAttribute('src');
        elementItem.setAttribute('src', 'https://lettererdev.blob.core.windows.net/mczachurski/' + imageName);
    }
}
