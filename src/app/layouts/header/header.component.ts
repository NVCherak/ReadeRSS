import { Component, OnInit } from '@angular/core';
import { Feed } from '../../models/feed.model'
import { FeedsService } from 'src/app/services/feeds.service';
import { Router, ActivatedRoute, Data, Params } from '@angular/router';
import { GenIdService } from 'src/app/services/genId.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  feed: Feed

  constructor(private feedService: FeedsService,
              private route: ActivatedRoute,
              private router: Router,
              private genId: GenIdService) { }

  ngOnInit() {
    this.feed = new Feed(this.genId.generateId(), '')

    this.route.params.subscribe((params: Params) => {
      const url = params['id'];

      if (url) {
        this.route.data.subscribe((data: Data) => {
          if (data['feed']) {
            this.feed = data['feed'];
          } else {
            alert('Feed not found');
            this.router.navigate(['/feeds']);
          }
        });
      }
    });
  }

  onSave() {
    this.feedService.addFeed(this.feed).then(
      (feeds: Feed[]) => {
        this.feedService.feedsChanged.emit(feeds);
        this.router.navigate(['/feeds', this.feed.id]);
      },
      (error) => {
        alert(error);
      },
    );
  }

}
