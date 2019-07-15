import { Component, OnInit, Input } from '@angular/core';
import { Feed } from 'src/app/models/feed.model';
import { FeedsService } from 'src/app/services/feeds.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-feeds-list',
  templateUrl: './feeds-list.component.html',
  styleUrls: ['./feeds-list.component.sass']
})
export class FeedsListComponent implements OnInit {
  feeds: Feed[];

  @Input() section: string;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private feedsService: FeedsService) { }

  ngOnInit() {
    this.feedsService.getFeeds().then((feeds: Feed[]) => {
      this.feeds = feeds;
    });

    this.feedsService.feedsChanged.subscribe((feeds: Feed[]) => {
      this.feeds = feeds;
    });
  }

  deleteFeed(feedId: string) {
    if (confirm('Are you sure?')) {
      this.feedsService.deleteFeed(feedId).then((feeds: any) => {
        this.feedsService.feedsChanged.emit(feeds.feeds);
        this.router.navigate(['/feeds']);
      });
    }
  }

}
