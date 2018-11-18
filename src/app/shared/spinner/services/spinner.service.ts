import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SpinnerService {

    private _isDisplayed: Boolean = false;

    constructor() { }

    show() {
        this._isDisplayed = true;
    }

    hide() {
        this._isDisplayed = false;
    }

    isDisplayed(): Boolean {
        return this._isDisplayed;
    }
}
