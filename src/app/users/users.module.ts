import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QueryTableComponent } from './query-table/query-table.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserProcessorInterceptor } from './user-processor.interceptor';
import { MatTableModule } from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import {MatDialogModule} from '@angular/material/dialog';
import { MapDialogComponent } from './map-dialog/map-dialog.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [QueryTableComponent, MapDialogComponent],
  imports: [
    HttpClientModule, 
    CommonModule,
    MatTableModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA9fs2zowuX8wqX7lcF8lQ2xpEef77qNAg'
    })],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UserProcessorInterceptor,
      multi: true,
    },
  ],
  exports: [QueryTableComponent],
})
export class UsersModule {}
