import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TalksDashboardComponent } from './components/talks-dashboard/talks-dashboard.component';
import { TalksComponent } from './components/talks/talks.component';
import { FiltersComponent } from './components/filters/filters.component';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatCardModule} from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TalkDetailComponent } from './components/talk-detail/talk-detail.component';
import { TalkComponent } from './components/talk/talk.component';

@NgModule({
  declarations: [
    AppComponent,
    TalksDashboardComponent,
    TalksComponent,
    FiltersComponent,
    TalkDetailComponent,
    TalkComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatInputModule,
    MatCheckboxModule,
    MatCardModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
