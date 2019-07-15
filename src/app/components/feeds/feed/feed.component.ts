import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Feed } from 'src/app/models/feed.model';
import { FeedsService } from 'src/app/services/feeds.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.sass']
})
export class FeedComponent implements OnInit {
  feed: Feed;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private feedsService: FeedsService) { }

  ngOnInit() {
    this.route.data.subscribe((data: Data) => {
      if (data['feed']) {
        this.feed = data['feed'];
      } else {
        alert('Feed not found');
        this.router.navigate(['/feeds']);
      }
    });
  }
}
