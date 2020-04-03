import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserShellComponent } from './users/containers/user-shell/user-shell.component';
import { LoginContainerComponent } from './login/login-container.component';


const routes: Routes = [
  { path: '', component: LoginContainerComponent },
  { path: 'users', component: UserShellComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
