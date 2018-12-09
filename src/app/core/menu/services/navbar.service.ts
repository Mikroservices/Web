import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class NavbarService {
    public isNewStoryActionVisible: boolean = true;
    public isPublishStoryActionVisible: boolean = false;
}