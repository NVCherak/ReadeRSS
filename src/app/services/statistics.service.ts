import { Injectable } from '@angular/core';
import { Feed } from '../models/feed.model';
import { FeedsService } from './feeds.service';
import { Chart } from 'angular-highcharts';

@Injectable()
export class StatisticService {
  constructor(private feedsService: FeedsService) { }

  buildStatistic(feedId: string) {
    return new Promise((resolve) => {
      this.feedsService.getFeed(feedId).then((feed: Feed) => {
        const statistic = {
          feedName: feed.title,
          notifications: feed.notifications,
          notificationsCount: feed.notifications.length
        };

        const authors = [];
        for (const notification of feed.notifications) {
          if (notification.author && authors.indexOf(notification.author) === -1) {
            authors.push(notification.author);
          }
        }

        statistic['authorsCount'] = authors.length;

        resolve(statistic);
      });
    });
  }

  getLettersFrequency(description: string) {
    return new Promise((resolve) => {
      const letters = description.toLowerCase().match(/[a-z]/g) || [];
      const descriptionLength = letters.length;

      const lettersCount = {};
      for (const letter of letters) {
        if (!(letter in lettersCount)) {
          lettersCount[letter] = 1;
        } else {
          lettersCount[letter] += 1;
        }
      }

      const chartData = [];
      for (const prop in lettersCount) {
        if (lettersCount.hasOwnProperty(prop)) {
          chartData.push({
            name: prop,
            y: (lettersCount[prop] / descriptionLength) * 100
          });
        }
      }

      chartData.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }

        return 0;
      });

      const chart = new Chart({
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie'
        },
        title: {
          text: 'The frequency of the appearance of the letters of the Latin alphabet'
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f} %',
            }
          }
        },
        series: [{
          type: 'pie',
          name: 'Frequency',
          data: chartData
        }]
      });

      resolve({ chart: chart, descriptionLength: descriptionLength });
    });
  }
}
