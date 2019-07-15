import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Rss2jsonService } from './rss2json.service';
import { Feed } from '../models/feed.model';
import { Notification } from '../models/notification.model'
import { GenIdService } from './genId.service';


export class FeedsService {
  feedsChanged = new EventEmitter<Feed[]>();

  constructor(private http: HttpClient,
              private genId: GenIdService,
              private rss2json: Rss2jsonService) { }

  private loadFeeds() {
    return JSON.parse(localStorage.getItem('feeds'));
  }

  private saveFeeds(feeds) {
    localStorage.setItem('feeds', JSON.stringify(feeds));
  }
  
  addFeed(feed: Feed): Promise<Feed[]> {
    return new Promise((resolve, reject) => {
      this.parseFeed(feed.url).subscribe((response: any) => {
        if (response.status === 'ok') {
          feed.title = response.feed.title;
          feed.url = response.feed.url;
          feed.description = response.feed.description;
          feed.image = response.feed.image;
          feed.notifications = [];

          for (const item of response.items) {
            let enclosure = '';
            if (item.enclosure && Object.keys(item.enclosure).length !== 0) {
              if (item.enclosure.type && item.enclosure.type.indexOf('image') !== -1) {
                enclosure = item.enclosure.link;
              }

              if (item.enclosure.thumbnail) {
                enclosure = item.enclosure.thumbnail;
              }
            }

            const notification = new Notification(
              this.genId.generateId(),
              item.title,
              item.link,
              item.description,
              item.pubDate,
              item.author,
              enclosure
            );

            feed.notifications.push(notification);
          }

          const feeds = this.loadFeeds() || [];
          feeds.push(feed);
          this.saveFeeds(feeds);

          resolve(feeds);
        } else {
          reject(response.notification);
        }
      })
    })
  }

  getFeed(id: string): Promise<Feed> {
    return new Promise((resolve) => {
      const feeds = this.loadFeeds();
      let output = null;

      if (feeds) {
        output = feeds.find(feed => {
          return id === feed.id;
        });
      }

      resolve(output);
    });
  }

  getFeeds(): Promise<Feed[]> {
    return new Promise((resolve) => {
      const feeds = this.loadFeeds();

      resolve(feeds);
    });
  }

  deleteFeed(id: string) {
    return new Promise((resolve) => {
      const feeds = this.loadFeeds();
      const extKey = feeds.findIndex((feed) => {
        return id === feed.id;
      });

      feeds.splice(extKey, 1);
      this.saveFeeds(feeds);

      resolve({ feeds: feeds, lastDeletedPosition: extKey });
    });
  }

  editFeed(feed: Feed): Promise<Feed[]> {
    return new Promise((resolve) => {
      this.deleteFeed(feed.id).then(data => {
        data['feeds'].splice(data['lastDeletedPosition'], 0, feed);
        this.saveFeeds(data['feeds']);
        resolve(data['feeds']);
      })
    }) 
  }

  parseFeed(url: string) {
    return this.http.get(
      this.rss2json.getApiUrl(),
      {
        params: {
          rss_url: url,
          api_key: this.rss2json.getApiKey(),
          count: this.rss2json.getCountNotifications(),
        }
      }
    );
  }
}
