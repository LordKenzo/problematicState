import { TalkServices } from './../../services/talk.services';
import { Component, OnInit } from '@angular/core';
import { Talk } from 'src/app/models/talk';
import { Filters } from 'src/app/models/filter';

@Component({
  selector: 'app-talks-dashboard',
  templateUrl: './talks-dashboard.component.html',
  styleUrls: ['./talks-dashboard.component.css']
})
export class TalksDashboardComponent implements OnInit {

  _talks: Talk[];

  constructor(public service: TalkServices) { }

  get talks(): Talk[] | null {
    return this.service.talks;
  }

  ngOnInit() {
  }

  handleFiltersChange(filters: Filters): void {
    this.service.changeFilters(filters);
  }

}
