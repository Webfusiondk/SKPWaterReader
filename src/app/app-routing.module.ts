import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReaderControllerComponent } from '../app/reader-controller/reader-controller.component';
import { ClickedReaderComponent } from '../app/clicked-reader/clicked-reader.component';
import { LocationControllerComponent } from './location-controller/location-controller.component';
import { StatisticControllerComponent } from './statistic-controller/statistic-controller.component';
import { ClickedStatsComponent } from './clicked-stats/clicked-stats.component';
import { HomeComponent } from './home/home.component';
import { AuthGuardComponent } from './Helpers/auth-guard.component';
import { HistoryComponent } from './history-data/history.component';
import { AdminControllerComponent } from './admin-controller/admin-controller.component';
import { AdminGuard } from './Helpers/admin.guard'
import { AdminComponent } from './admin/admin.component';
import { AdminDeleteComponentComponent } from './admin/admin-delete-component/admin-delete-component.component';
import { AdminEditComponentComponent } from './admin/admin-edit-component/admin-edit-component.component';
import { DeleteReaderComponent } from './admin/admin-delete-component/delete-reader/delete-reader.component';
import { EditReaderComponent } from './admin/admin-edit-component/edit-reader/edit-reader.component';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const usersModule = () => import('./users/user.module').then(x => x.UsersModule);

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuardComponent] },
  { path: 'users', loadChildren: usersModule, canActivate: [AdminGuard] },
  { path: 'location', component: LocationControllerComponent },
  { path: 'account', loadChildren: accountModule },
  { path: 'readers', component: ReaderControllerComponent },
  { path: 'clicked', component: ClickedReaderComponent },
  { path: 'statistic', component: StatisticControllerComponent, canActivate: [AuthGuardComponent] },
  { path: 'clickedStats', component: ClickedStatsComponent },
  { path: 'historyData', component: HistoryComponent, canActivate: [AuthGuardComponent] },
  { path: 'admin', component: AdminControllerComponent, canActivate: [AdminGuard] },
  { path: 'adminComponent', component: AdminComponent, canActivate: [AdminGuard] },
  { path: 'adminDeleteComponent', component: AdminDeleteComponentComponent, canActivate: [AdminGuard] },
  { path: 'adminEditComponent', component: AdminEditComponentComponent, canActivate: [AdminGuard] },
  { path: 'deleteReader', component: DeleteReaderComponent, canActivate: [AdminGuard] },
  { path: 'editReader', component: EditReaderComponent, canActivate: [AdminGuard] },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
