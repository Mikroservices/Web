import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoryItemComponent } from './components/story-item/story-item.component';

@NgModule({
    declarations: [
        StoryItemComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        StoryItemComponent
    ]
})
export class StoriesModule { }
