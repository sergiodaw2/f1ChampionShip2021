import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { PilotDetailsComponent } from './pilot-details/pilot-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RaceDetailsComponent } from './race-details/race-details.component';
import { Route,RouterModule } from '@angular/router';
import { SharingService } from './services/sharing.service';

const APP_ROUTES: Route[] = [
  {path: 'pilot-details', component:PilotDetailsComponent},
  {path: 'race-details', component: RaceDetailsComponent},
  {path: 'main-page', component: MainPageComponent},
  { path: '', redirectTo: 'main-page', pathMatch: 'full' },
  { path: '**', redirectTo: 'main-page', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    PilotDetailsComponent,
    RaceDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(APP_ROUTES)
  ],
  providers: [SharingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
