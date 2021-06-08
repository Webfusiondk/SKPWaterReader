import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReaderControllerComponent } from '../app/reader-controller/reader-controller.component';
import { ClickedReaderComponent } from '../app/clicked-reader/clicked-reader.component';
import { LocationControllerComponent } from './location-controller/location-controller.component';
import { StatisticControllerComponent } from './statistic-controller/statistic-controller.component';
import { ClickedStatsComponent } from './clicked-stats/clicked-stats.component';
import { HomeComponent } from './home/home.component';
import { AuthGuardComponent } from './Helpers/auth-guard.component';
import { HistoryComponent } from './history-data/history.component'

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const usersModule = () => import('./users/user.module').then(x => x.UsersModule);

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuardComponent] },
  { path: 'users', loadChildren: usersModule, canActivate: [AuthGuardComponent] },
  { path: 'location', component: LocationControllerComponent},
  { path: 'account', loadChildren: accountModule },
  { path: 'readers', component: ReaderControllerComponent},
  { path: 'clicked', component: ClickedReaderComponent},
  { path: 'statistic', component: StatisticControllerComponent },
  { path: 'clickedStats', component: ClickedStatsComponent },
  { path: 'historyData', component: HistoryComponent},

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
