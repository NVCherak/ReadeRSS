import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeedsComponent } from './components/feeds/feeds.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { FeedComponent } from './components/feeds/feed/feed.component';
import { FeedResolver } from './services/feed-resolver.service';
import { NotificationViewComponent } from './components/feeds/notification-view/notification-view.component';
import { NotificationResolver } from './services/notification-resolver.service';
import { StatisticResolver } from './services/statistics-resolver.service';
import { StatisticsMassageComponent } from './components/statistics/statistics-massage/statistics-massage.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/feeds',
    pathMatch: 'full'
  },
  {
    path: 'feeds',
    component: FeedsComponent,
    children: [
      {
        path: ':id',
        component: FeedComponent,
        resolve: { feed: FeedResolver },
        children: [
          {
            path: 'notification/:id',
            component: NotificationViewComponent,
            resolve: { notification: NotificationResolver }
          }
        ]
      }
    ]
  },
  {
    path: 'statistics',
    component: StatisticsComponent,
    children: [
      {
        path: ':id', // feed ID
        component: StatisticsComponent,
        resolve: { statistic: StatisticResolver },
        children: [
          {
            path: 'notification/:id',
            component: StatisticsMassageComponent,
            resolve: { notification: NotificationResolver }
          }
        ]
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
