import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { Notification } from '../models/notification.model'
import { NotificationsService } from './notifications.services'

@Injectable()
export class NotificationResolver implements Resolve<Notification> {
  constructor(private notificationsService: NotificationsService) { }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<Notification> | Promise<Notification> | Notification {
    return this.notificationsService.getNotification(route.parent.params['id'], route.params['id']);
  }
}