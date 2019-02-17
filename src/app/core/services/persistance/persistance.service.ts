import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class PersistanceService {

    set(key: string, data: any): void {
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch (e) {
            console.error('Error saving to localStorage', e);
        }
    }

    get(key: string): any {
        try {
            return JSON.parse(localStorage.getItem(key));
        } catch (e) {
            console.error('Error getting data from localStorage', e);

            return null;
        }
    }

    remove(key: string): void {
        try {
            localStorage.removeItem(key);
        } catch (e) {
            console.error('Error removing from localStorage', e);
        }
    }

    setAccessToken(data: any): void {
        this.set('access_token', data);
    }

    getAccessToken(): any {
        return this.get('access_token');
    }

    removeAccessToken(): void {
        localStorage.removeItem('access_token');
    }
}
