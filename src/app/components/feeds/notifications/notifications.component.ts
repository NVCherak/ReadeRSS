import { Component, OnInit, Input } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Notification } from '../../../models/notification.model'
import { NotificationsService } from '../../../services/notifications.services'


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.sass']
})
export class NotificationsComponent implements OnInit {
  @Input() notifications: Notification[];
  @Input() section: string;


  constructor(private router: Router,
              private route: ActivatedRoute,
              private notificationsService: NotificationsService) { }

  ngOnInit() {
  }

  loadNotification(notificationId: string) {
    this.router.navigate(['notification', notificationId], { relativeTo: this.route });

    this.notificationsService.setReadStatus(true, this.route.snapshot.params['id'], notificationId).then((notification: Notification) => {
      this.markNotification(notification);
    });
  }

  markAsUnread(notificationId: string) {
    if (this.section !== 'statistic') {
      this.notificationsService.setReadStatus(false, this.route.snapshot.params['id'], notificationId).then(this.markNotification);
    }
  }

  deleteNotification(notificationId: string) {
    if (confirm('Are you sure?')) {
      this.notificationsService.deleteNotification(this.route.snapshot.params['id'], notificationId).then((notifications: Notification[]) => {
        this.notifications = notifications;
      });
    }
  }

  private markNotification = (notification: Notification) => {
    const index = this.notifications.findIndex(item => {
      return item.id === notification.id;
    });

    this.notifications[index].wasRead = notification.wasRead;
  }

}
