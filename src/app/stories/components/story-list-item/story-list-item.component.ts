import { Component, Input } from '@angular/core';

import { Story } from 'src/app/core/models/story';

@Component({
    selector: 'app-story-list-item',
    templateUrl: './story-list-item.component.html',
    styleUrls: ['./story-list-item.component.less']
})
export class StoryListItemComponent {

    readonly day = 1000 * 60 * 60 * 24;
    readonly daysInMonth = 30;
    readonly monthsInYear = 12;

    @Input()
    story: Story;

    get duration(): string {
        if (this.story.duration === 0) {
            return 'nothing to read';
        }

        if (this.story.duration === 1) {
            return '1 minute read';
        }

        return this.story.duration + ' minutes read';
    }

    get words(): string {
        if (this.story.words === 0) {
            return 'empty';
        }

        if (this.story.words === 1) {
            return '1 word';
        }

        return this.story.words + ' words';
    }

    get lastEdited(): string {
        const now = new Date();
        const modified = new Date(this.story.modified);

        const diff = Math.floor(now.getTime() - modified.getTime());

        const days = Math.floor(diff / this.day);
        const months = Math.floor(days / this.daysInMonth);
        const years = Math.floor(months / this.monthsInYear);

        if (years > 0) {
            if (months > 6) {
                return 'almost' + (years + 1) + ' years ago';
            }

            if (years === 1) {
                return '1 year ago';
            }

            return (years + 1) + ' years ago';
        }

        if (months > 0) {
            if (days > 20) {
                return 'almost ' + (months + 1) + ' months ago';
            }

            if (months === 1) {
                return '1 month ago';
            }

            return (months + 1) + ' months ago';
        }

        if (days > 20) {
            return 'almost 1 month ago';
        }

        if (days === 1) {
            return '1 day ago';
        }

        if (days === 0) {
            return 'today';
        }

        return days + ' ago';
    }
}
