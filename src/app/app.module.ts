import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { JwtInterceptor} from './Helpers/jwt.interceptor';
import { ErrorInterceptor } from './Helpers/ErrorInterceptor';
import { AppComponent } from './app.component';
import { WaterReaderComponent } from './water-reader/water-reader.component';
import { ReaderControllerComponent } from './reader-controller/reader-controller.component';
import { ClickedReaderComponent } from './clicked-reader/clicked-reader.component';
import { LocationComponent } from './location/location.component';
import { LocationControllerComponent } from './location-controller/location-controller.component';
import * as echarts from 'echarts';
import { NgxEchartsModule } from 'ngx-echarts';
import { StatisticControllerComponent } from './statistic-controller/statistic-controller.component';
import { ClickedStatsComponent } from './clicked-stats/clicked-stats.component';
import { FilterPipePipe } from './filter-pipe.pipe';
import { HomeComponent } from './home/home.component';
import { AlertComponent  } from './alert-component/alert.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HistoryComponent } from './history-data/history.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule} from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminComponent } from '../app/admin/admin.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AdminControllerComponent } from './admin-controller/admin-controller.component';
import { AdminDeleteComponentComponent } from './admin/admin-delete-component/admin-delete-component.component';
import { AdminEditComponentComponent } from './admin/admin-edit-component/admin-edit-component.component';
import { DeleteReaderComponent } from './admin/admin-delete-component/delete-reader/delete-reader.component';
import { EditReaderComponent } from './admin/admin-edit-component/edit-reader/edit-reader.component';

@NgModule({
  declarations: [
    AppComponent,
    WaterReaderComponent,
    ReaderControllerComponent,
    ClickedReaderComponent,
    LocationComponent,
    LocationControllerComponent,
    StatisticControllerComponent,
    ClickedStatsComponent,
    FilterPipePipe,
    HomeComponent,
    AlertComponent,
    HistoryComponent,
    AdminComponent,
    AdminControllerComponent,
    AdminDeleteComponentComponent,
    AdminEditComponentComponent,
    DeleteReaderComponent,
    EditReaderComponent
  ],
  imports: [
    BrowserModule,
    NgxEchartsModule.forRoot({ echarts }),
    AppRoutingModule,
    RouterModule.forRoot([], { relativeLinkResolution: 'legacy' }),
    HttpClientModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    MatInputModule,
    MatPaginatorModule,
    MatTableModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    MatDatepickerModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
