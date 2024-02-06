import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutMeComponent } from './about-me/about-me.component';


const routes: Routes = [
    {
      path: 'about', component: AboutMeComponent
    },
    { path: '', redirectTo: 'about', pathMatch: 'full' },
  ];
  @NgModule({
    imports: [
      RouterModule.forChild(routes)
    ],
    exports: [RouterModule],
  })
  export class ContentRoutingModule {
  
  }
  