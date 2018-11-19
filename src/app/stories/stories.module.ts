import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { StoryDetailsComponent } from './components/story-details/story-details.component';
import { StoryEditComponent } from './components/story-edit/story-edit.component';

@NgModule({
    declarations: [
        StoryDetailsComponent,
        StoryEditComponent
    ],
    imports: [
        SharedModule
    ]
})
export class StoriesModule { }
