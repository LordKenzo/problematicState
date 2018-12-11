import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Talk } from '../models/talk';
import { Filters } from './../models/filter';

@Injectable({
  providedIn: 'root'
})
export class TalkServices {
  private talksList = [
    {
      'id': 898,
      'title': 'Are we there yet?',
      'speaker': 'Rich Hickey',
      'description': 'In his keynote at JVM Languages Summit 2009, Rich Hickey advocated for the reexamination of basic principles like state, identity, value, time, types, genericity, complexity, as they are used by OOP today, to be able to create the new constructs and languages to deal with the massive parallelism and concurrency of the future.',
      'yourRating': null,
      'rating': 9.1
    },
    {
      'id': 777,
      'title': 'The Value of Values',
      'speaker': 'Rich Hickey',
      'description': 'Rich Hickey compares value-oriented programming with place-oriented programming concluding that the time of imperative languages has passed and it is the time of functional programming.',
      'yourRating': null,
      'rating': 8.5
    },
    {
      'id': 466,
      'title': 'Simple Made Easy',
      'speaker': 'Rich Hickey',
      'description': 'Rich Hickey emphasizes simplicity’s virtues over easiness’, showing that while many choose easiness they may end up with complexity, and the better way is to choose easiness along the simplicity path.',
      'yourRating': null,
      'rating': 8.2
    },
    {
      'id': 322,
      'title': 'Growing a Language',
      'speaker': 'Guy Steele',
      'description': 'Guy Steele\'s keynote at the 1998 ACM OOPSLA conference on \'Growing a Language\' discusses the importance of and issues associated with designing a programming language that can be grown by its users.',
      'yourRating': null,
      'rating': 8.9
    }
  ];

  public _talks: {[id: number]: Talk} = {};
  private talkArray: Talk[] = [];
  public filters: Filters = {
    speaker: null,
    title: null,
    minRating: 0,
    caseSensitive: false
  };
  private lastRefetch: Date = null;
  private refetchTimeInSeconds = 5;

  constructor(private http: HttpClient) {}

  get talks(): Talk[] {
    if (this.talkArray.length <= 0 || (!this.lastRefetch || new Date() >= this.lastRefetch)) {
      this.lastRefetch = new Date();
      this.lastRefetch.setSeconds(this.lastRefetch.getSeconds() + this.refetchTimeInSeconds);
      this.refetch();
    }
    return this.talkArray.map(n => this._talks[n.id] = n);
  }

  findTalk(id: number): Observable<Talk> {
    if (!this._talks) {
      this.refetch();
    }
    return of(this._talks[id]);
  }

  changeFilters(filters: Filters): void {
    this.filters = filters;
    this.refetch();
  }

  private refetch(): void {
    let params = new HttpParams();
    params = params.append('speaker', this.filters.speaker);
    params = params.append('title', this.filters.title);
    params = params.append('minRating', this.filters.minRating.toString());
    params = params.append('caseSensitive', this.filters.caseSensitive.toString());

    this.get(params).subscribe(
      talks => this.talkArray = talks
    );

  }

  private get(filters): Observable<Talk[]> {
    const title = filters.get('title');
    const speaker = filters.get('speaker');
    const rating = filters.get('minRating');
    const caseSensitive = (filters.get('caseSensitive') === 'true');
    const filteredTalks = this.talksList.filter(t => {
      const titlePass =  this.isStringExist(title, t.title, caseSensitive);
      const speakerPass = this.isStringExist(speaker, t.speaker, caseSensitive);
      const ratingPass = rating ? t.rating >= rating : true;
      return titlePass && speakerPass && ratingPass;
    });
    return of(filteredTalks);
  }

  private isStringExist(stringA: string, stringB: string, caseSensitive: boolean): boolean {
    if (!caseSensitive) {
      stringB = stringB ? stringB.toLocaleLowerCase() : null;
      stringA = stringA ? stringA.toLocaleLowerCase() : null;
    }
    return stringA ? stringB.indexOf(stringA) > -1 : true;
  }

}
