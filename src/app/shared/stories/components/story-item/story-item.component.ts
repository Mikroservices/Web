import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-story-item',
    templateUrl: './story-item.component.html',
    styleUrls: ['./story-item.component.less']
})
export class StoryItemComponent implements OnInit {

    index: number = 0;
    claps: number = 10;

    constructor() { }

    ngOnInit() {
        this.index = this.randomInt(1, 10000);
        this.claps = this.randomInt(20, 1000);
    }

    randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}
