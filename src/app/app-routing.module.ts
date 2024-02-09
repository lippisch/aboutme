import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { SiteInfoComponent } from './site-info/site-info.component';
import { GuessMyNumberComponent } from './guess-my-number/guess-my-number.component';

const routes: Routes = [
  { path: 'about', component: AboutMeComponent },
  { path: 'siteinfo', component: SiteInfoComponent },
  { path: 'gmn', component: GuessMyNumberComponent },
  { path: '', component: AboutMeComponent },
  {
    path: '**', component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
