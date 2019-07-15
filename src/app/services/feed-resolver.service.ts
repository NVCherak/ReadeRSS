import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { Feed } from '../models/feed.model';
import { FeedsService } from './feeds.service';

@Injectable()
export class FeedResolver implements Resolve<Feed> {
  constructor(private feedsService: FeedsService) { }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<Feed> | Promise<Feed> | Feed {
    return this.feedsService.getFeed(route.params['id']);
  }
}