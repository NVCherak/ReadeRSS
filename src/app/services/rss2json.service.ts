import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Rss2jsonService {
  private apiUrl = 'https://api.rss2json.com/v1/api.json';
  private apiKey = 'lhw8n2jwrzyohzmeqmzzehfxiza6fx23kxubhj8c';
  private countNotifications = '20';

  getApiUrl(): string {
    return this.apiUrl;
  }

  getApiKey(): string {
    return this.apiKey;
  }

  getCountNotifications(): string {
    return this.countNotifications;
  }
}
