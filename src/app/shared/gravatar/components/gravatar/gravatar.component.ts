import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-gravatar',
    templateUrl: './gravatar.component.html',
    styleUrls: ['./gravatar.component.less']
})
export class GravatarComponent implements OnInit {

    @Input()
    size: number;

    @Input()
    emailHash: string;

    url: string;

    ngOnInit(): void {
        this.url = '//www.gravatar.com/avatar/' + this.emailHash + '?s=' + this.size + '&r=g&d=retro';
    }
}
