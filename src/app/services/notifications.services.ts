import { EventEmitter, Injectable } from '@angular/core';
import { Notification } from '../models/notification.model';
import { Feed } from '../models/feed.model'
import { FeedsService } from './feeds.service';

@Injectable()
export class NotificationsService {
    notification = new EventEmitter<Notification>();

    constructor(private feedsService: FeedsService) { }

    getNotification(feedId: string, notificationId: string): Promise<Notification> {
        return new Promise((resolve) => {
            this.feedsService.getFeed(feedId).then((feed: Feed) => {
                let output = null;

                if (feed && feed.notifications) {
                    output = feed.notifications.find(notification => {
                        return notification.id === notificationId;
                    });
                }

                resolve(output);
            });
        });
    }

    deleteNotification(feedId: string, notificationId: string): Promise<Notification[]> {
        return new Promise((resolve) => {
            this.feedsService.getFeed(feedId).then((feed: Feed) => {
                const index = feed.notifications.findIndex(notification => {
                    return notification.id === notificationId;
                });

                feed.notifications.splice(index, 1);

                this.feedsService.editFeed(feed).then(() => {
                    resolve(feed.notifications);
                });
            });
        });
    }

    setReadStatus(status: boolean, feedId: string, notificationId: string) {
        return new Promise((resolve) => {
            this.feedsService.getFeed(feedId).then((feed: Feed) => {
                const index = feed.notifications.findIndex(notification => {
                    return notification.id === notificationId;
                });

                feed.notifications[index].wasRead = status;

                this.feedsService.editFeed(feed).then(() => {
                    resolve(feed.notifications[index]);
                });
            });
        });
    }
}
