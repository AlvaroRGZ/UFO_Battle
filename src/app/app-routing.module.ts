import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PresentationComponent} from "./presentation/presentation.component";
import {RegistrationComponent} from "./registration/registration.component";
import {PreferencesComponent} from "./preferences/preferences.component";

const routes: Routes = [
  {path: 'presentation', component: PresentationComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'preferences', component: PreferencesComponent},
  {path: ' ', redirectTo: 'presentation', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
