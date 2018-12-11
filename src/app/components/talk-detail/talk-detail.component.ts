import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { mergeMap } from 'rxjs/operators';

import { TalkServices } from 'src/app/services/talk.services';
import { Talk } from './../../models/talk';

@Component({
  selector: 'app-talk-detail',
  templateUrl: './talk-detail.component.html',
  styleUrls: ['./talk-detail.component.css']
})
export class TalkDetailComponent implements OnInit {
  @Input() talk: Talk;
  constructor(private route: ActivatedRoute, private service: TalkServices) {
    this.route.params.pipe(
      mergeMap(p => this.service.findTalk(+p['id']))
    ).subscribe(t => this.talk = t);
  }

  ngOnInit() {
  }

}
