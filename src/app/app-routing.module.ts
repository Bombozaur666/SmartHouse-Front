import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { DevicesComponent } from './devices/devices.component';
import { HousesComponent } from './houses/houses.component';
import { ProducentsComponent } from './producents/producents.component';
import { DevicysListComponent } from './devices/devicys-list/devicys-list.component';
import { ResultsComponent } from './devices/results/results.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  {
    path: 'devices', component: DevicesComponent,
    children: [
      {path: '', component: DevicysListComponent},
      {path: ':id', component: ResultsComponent}
    ]
  },
  {
    path: 'houses', component: HousesComponent,
  },
  {
    path: 'producents', component: ProducentsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
