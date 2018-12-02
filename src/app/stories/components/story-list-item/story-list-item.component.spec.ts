import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryListItemComponent } from './story-list-item.component';

describe('StoryListItemComponent', () => {
    let component: StoryListItemComponent;
    let fixture: ComponentFixture<StoryListItemComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [StoryListItemComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(StoryListItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
