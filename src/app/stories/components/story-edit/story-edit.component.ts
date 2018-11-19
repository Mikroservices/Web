import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-story-edit',
    templateUrl: './story-edit.component.html',
    styleUrls: ['./story-edit.component.less']
})
export class StoryEditComponent implements OnInit {

    text: String = "";
    placeholder: String = "Enter your story here...";

    constructor() { }

    ngOnInit() {
    }
}
