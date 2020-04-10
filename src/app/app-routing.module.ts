import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListContainerComponent } from './users/user-list/user-list-container.component';
import { LoginContainerComponent } from './login/login-container.component';
import { UserEditContainerComponent } from './users/user-edit/user-edit-container.component';


const routes: Routes = [
  { path: '', component: LoginContainerComponent },
  { path: 'user-list', component: UserListContainerComponent },
  { path: 'user-edit', component: UserEditContainerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
