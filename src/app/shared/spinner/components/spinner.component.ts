import { Component, OnInit } from '@angular/core';
import { SpinnerService } from '../services/spinner.service'
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
    selector: 'app-spinner',
    templateUrl: './spinner.component.html',
    styleUrls: ['./spinner.component.less'],
    animations: [
        trigger('fadeInOut', [
            transition(':enter', [   // :enter is alias to 'void => *'
                style({ opacity: 0 }),
                animate(0, style({ opacity: 1 }))
            ]),
            transition(':leave', [   // :leave is alias to '* => void'
                animate(800, style({ opacity: 0 }))
            ])
        ])
    ]
})
export class SpinnerComponent implements OnInit {

    constructor(private spinnerService: SpinnerService) { }

    ngOnInit() {
    }

    get isDisplayed() {
        return this.spinnerService.isDisplayed();
    }

}
