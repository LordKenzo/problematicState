import { Component, OnInit, Input } from '@angular/core';
import { Talk } from 'src/app/models/talk';

@Component({
  selector: 'app-talk',
  templateUrl: './talk.component.html',
  styleUrls: ['./talk.component.css']
})
export class TalkComponent implements OnInit {
  @Input() talk: Talk;
  constructor() { }

  ngOnInit() {
  }

}
