import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";

import { environment } from "src/environments/environment";
import { Story } from "src/app/core/models/story";

@Injectable({
    providedIn: 'root'
})
export class StoriesService {

    private get storiesService() {
        return environment.httpSchema + environment.storiesService;
    }

    constructor(private httpClient: HttpClient) {
    }

    public stories(): Observable<Story[]> {
        return this.httpClient.get<Story[]>(this.storiesService + '/stories');
    }

    public story(token: string): Observable<Story> {
        return this.httpClient.get<Story>(this.storiesService + '/stories/' + token);
    }

    public create(story: Story): Observable<Story> {
        return this.httpClient.post<Story>(this.storiesService + '/stories', story);
    }

    public update(token: string, story: Story): Observable<Story> {
        return this.httpClient.put<Story>(this.storiesService + '/stories/' + token, story);
    }

    public delete(token: string): Observable<Object> {
        return this.httpClient.delete(this.storiesService + '/stories/' + token);
    }

    public publish(token: string): Observable<Story> {
        return this.httpClient.post<Story>(this.storiesService + '/stories/publish/' + token, null);
    }
}