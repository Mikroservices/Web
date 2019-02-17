import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Story } from 'src/app/core/models/story';

@Injectable({
    providedIn: 'root'
})
export class StoriesService {

    private get storiesService() {
        return environment.httpSchema + environment.storiesService;
    }

    constructor(private httpClient: HttpClient) {
    }

    public async stories(): Promise<Story[]> {
        return this.httpClient.get<Story[]>(this.storiesService + '/stories').toPromise();
    }

    public async story(token: string): Promise<Story> {
        return this.httpClient.get<Story>(this.storiesService + '/stories/' + token).toPromise();
    }

    public async create(story: Story): Promise<Story> {
        return this.httpClient.post<Story>(this.storiesService + '/stories', story).toPromise();
    }

    public async update(token: string, story: Story): Promise<Story> {
        return this.httpClient.put<Story>(this.storiesService + '/stories/' + token, story).toPromise();
    }

    public async delete(token: string): Promise<Object> {
        return this.httpClient.delete(this.storiesService + '/stories/' + token).toPromise();
    }

    public async publish(token: string): Promise<Story> {
        return this.httpClient.post<Story>(this.storiesService + '/stories/publish/' + token, null).toPromise();
    }
}
