import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Notification } from '../../../models/notification.model';
import { StatisticService } from '../../../services/statistics.service';
declare var $: any;

@Component({
  selector: 'app-statistics-massage',
  templateUrl: './statistics-massage.component.html',
  styleUrls: ['./statistics-massage.component.sass']
})
export class StatisticsMassageComponent implements OnInit {
  chart;
  descriptionLength;
  notification: Notification;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private statisticService: StatisticService) { }

  ngOnInit() {
    this.route.data.subscribe((data: Data) => {
      if (data['notification']) {
        this.notification = data['notification'];

        $('.message-modal').modal('show');
      } else {
        alert('Notification not found');
        this.router.navigate(['/feeds']);
      }
    });

    const $modal = $('.message-modal');

    $modal.on('hidden.bs.modal', () => {
      this.closeMessage();
    });

    $modal.on('shown.bs.modal', () => {
      this.statisticService.getLettersFrequency(this.notification.description).then((data: any) => {
        this.chart = data.chart;
        this.descriptionLength = data.descriptionLength;
      });
    });
  }

  closeMessage() {
    setTimeout(() => {
      this.router.navigate(['/statistics', this.route.snapshot.parent.params['id']]);
    }, 300);
  }
}
