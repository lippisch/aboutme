import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MainpageComponent } from './mainpage/mainpage.component';
import { MatButtonModule } from '@angular/material/button';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AboutMeComponent } from './about-me/about-me.component';
import { SiteInfoComponent } from './site-info/site-info.component';
import { ContentService } from './services/content.service';
import { HttpClientModule } from '@angular/common/http';
import { MatExpansionModule } from '@angular/material/expansion';
import { GuessMyNumberComponent } from './guess-my-number/guess-my-number.component';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ChatAboutMeComponent } from './chat-about-me/chat-about-me.component';
import { LineBreakPipe } from './pipes/line-break.pipe';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [
    AppComponent,
    MainpageComponent,
    PageNotFoundComponent,
    AboutMeComponent,
    SiteInfoComponent,
    GuessMyNumberComponent,
    ChatAboutMeComponent,
    LineBreakPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatExpansionModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    ContentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
