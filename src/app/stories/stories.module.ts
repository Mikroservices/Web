import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { StoryDetailsComponent } from './components/story-details/story-details.component';
import { StoryEditComponent } from './components/story-edit/story-edit.component';
import { StoriesComponent } from './components/stories/stories.component';
import { StoryListItemComponent } from './components/story-list-item/story-list-item.component';

@NgModule({
    declarations: [
        StoryDetailsComponent,
        StoryEditComponent,
        StoriesComponent,
        StoryListItemComponent
    ],
    imports: [
        SharedModule
    ]
})
export class StoriesModule { }
