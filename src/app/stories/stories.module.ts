import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { StoryDetailsComponent } from './components/story-details/story-details.component';
import { StoryEditComponent } from './components/story-edit/story-edit.component';
import { StoriesComponent } from './components/stories/stories.component';

@NgModule({
    declarations: [
        StoryDetailsComponent,
        StoryEditComponent,
        StoriesComponent
    ],
    imports: [
        SharedModule
    ]
})
export class StoriesModule { }
