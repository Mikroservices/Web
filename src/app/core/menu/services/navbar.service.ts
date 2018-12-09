import { Injectable } from "@angular/core";
import { Subject } from "rxjs/internal/Subject";

@Injectable({
    providedIn: 'root'
})
export class NavbarService {

    public publishStoryAction = new Subject<any>();
    public deleteStoryAction = new Subject<any>();
    public editStoryAction = new Subject<any>();

    private _isNewStoryActionVisible: boolean = true;
    private _isPublishStoryActionVisible: boolean = false;
    private _isEditStoryActionVisible: boolean = false;

    public get isNewStoryActionVisible(): boolean {
        return this._isNewStoryActionVisible;
    }

    public get isPublishStoryActionVisible(): boolean {
        return this._isPublishStoryActionVisible;
    }

    public get isEditStoryActionVisible(): boolean {
        return this._isEditStoryActionVisible;
    }

    public setNewStoryActionVisible(): void {
        this._isNewStoryActionVisible = true;
        this._isPublishStoryActionVisible = false;
        this._isEditStoryActionVisible = false;
    }

    public setPublishStoryActionVisible(): void {
        this._isNewStoryActionVisible = false;
        this._isPublishStoryActionVisible = true;
        this._isEditStoryActionVisible = false;
    }

    public setEditStoryActionVisible(): void {
        this._isNewStoryActionVisible = false;
        this._isPublishStoryActionVisible = false;
        this._isEditStoryActionVisible = true;
    }

    public onPublishStoryAction(): void {
        this.publishStoryAction.next();
    }

    public onDeleteStoryAction(): void {
        this.deleteStoryAction.next();
    }

    public onEditStoryAction(): void {
        this.editStoryAction.next();
    }    
}