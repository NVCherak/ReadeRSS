import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Notification } from '../../../models/notification.model'
declare var $: any;

@Component({
  selector: 'app-notification-view',
  templateUrl: './notification-view.component.html',
  styleUrls: ['./notification-view.component.sass']
})
export class NotificationViewComponent implements OnInit {
  notification: Notification

  constructor(private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    const $modal = $('.message-modal');

    this.route.data.subscribe((data: Data) => {
      if (data['notification']) {
        this.notification = data['notification'];

        $modal.modal('show');
      } else {
        alert('Notification not found');
        this.router.navigate(['/feeds']);
      }
    });

    $modal.on('hidden.bs.modal', () => {
      this.closeNotification();
    });
  }

  closeNotification() {
    setTimeout(() => {
      this.router.navigate(['/feeds', this.route.snapshot.parent.params['id']]);
    }, 300);
  }

}
