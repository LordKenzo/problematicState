import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TalksDashboardComponent } from './components/talks-dashboard/talks-dashboard.component';
import { TalkDetailComponent } from './components/talk-detail/talk-detail.component';

const routes: Routes = [
  {path: 'talks', component: TalksDashboardComponent},
  {path: 'talk/:id', component: TalkDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
