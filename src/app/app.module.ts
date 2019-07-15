import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FeedsComponent } from './components/feeds/feeds.component';
import { NotificationsComponent } from './components/feeds/notifications/notifications.component';
import { NotificationViewComponent } from './components/feeds/notification-view/notification-view.component';
import { FeedsService } from './services/feeds.service';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { HttpClientModule } from '@angular/common/http';
import { FeedComponent } from './components/feeds/feed/feed.component';
import { FeedsListComponent } from './components/feeds/feeds-list/feeds-list.component';
import { TrimPipe } from './pipes/trim.pipe';
import { GenIdService } from './services/genId.service';
import { NotificationsService } from './services/notifications.services';
import { Rss2jsonService } from './services/rss2json.service';
import { FeedResolver } from './services/feed-resolver.service';
import { NotificationResolver } from './services/notification-resolver.service';
import { ChartModule } from 'angular-highcharts';
import { StatisticsMassageComponent } from './components/statistics/statistics-massage/statistics-massage.component';

@NgModule({
  declarations: [
    AppComponent,
    FeedsComponent,
    NotificationsComponent,
    NotificationViewComponent,
    HeaderComponent,
    FooterComponent,
    StatisticsComponent,
    FeedComponent,
    FeedsListComponent,
    TrimPipe,
    StatisticsMassageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ChartModule
  ],
  providers: [
    FeedsService,
    GenIdService,
    NotificationsService,
    Rss2jsonService,
    FeedResolver,
    NotificationResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
