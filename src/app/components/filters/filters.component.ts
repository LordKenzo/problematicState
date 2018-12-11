import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { Filters } from 'src/app/models/filter';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {
  @Output() filtersChange = new EventEmitter();

  @Input() set filters(v) {
    if (!v) {
      return;
    }
    this.filtersForm.setValue({
      title: v.title,
      speaker: v.speaker,
      highRating: v.minRating >= 9,
      caseSensitive: v.caseSensitive
    }, {emitEvent: false});
  }

  filtersForm = new FormGroup({
    speaker: new FormControl(),
    title: new FormControl(),
    highRating: new FormControl(false),
    caseSensitive: new FormControl(false)
  });

  constructor() {
    this.filtersForm.valueChanges.pipe(
      debounceTime(500)
    ).subscribe((value) => {
      this.filtersChange.next(this.createFiltersObject(value));
    });
  }

  private createFiltersObject({title, speaker, highRating, caseSensitive}: { title: string, speaker: string, highRating: false, caseSensitive: false }): Filters {
    const minRating = highRating ? 9 : 0;
    return {speaker: speaker || null, title: title || null, minRating, caseSensitive};
  }

  ngOnInit() {
  }

}
