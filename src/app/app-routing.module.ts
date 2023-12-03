import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PresentationComponent} from "./presentation/presentation.component";
import {RegistrationComponent} from "./registration/registration.component";
import {PreferencesComponent} from "./preferences/preferences.component";
import {LoginComponent} from "./login/login.component";
import {GameComponent} from "./game/game.component";
import {RecordsComponent} from "./records/records.component";
import {LogoutComponent} from "./logout/logout.component";
import {RouteGuardService} from "./shared/services/route-guard.service";

const routes: Routes = [
  {path: 'presentation', component: PresentationComponent},
  {path: 'preferences', component: PreferencesComponent},
  {path: 'records', component: RecordsComponent},
  {path: 'game', component: GameComponent},
  {path: 'registration', component: RegistrationComponent, canActivate: [RouteGuardService]},
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LogoutComponent},
  {path: '', redirectTo: 'presentation', pathMatch: 'full'},
  {path: ' ', redirectTo: 'presentation', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
