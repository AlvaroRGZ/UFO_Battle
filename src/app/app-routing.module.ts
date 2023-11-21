import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PresentationComponent} from "./presentation/presentation.component";
import {RegistrationComponent} from "./registration/registration.component";
import {PreferencesComponent} from "./preferences/preferences.component";
import {LoginComponent} from "./login/login.component";

const routes: Routes = [
  {path: 'presentation', component: PresentationComponent},
  {path: 'preferences', component: PreferencesComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'login', component: LoginComponent},
  {path: ' ', redirectTo: 'presentation', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
