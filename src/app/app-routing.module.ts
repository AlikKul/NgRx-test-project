import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListContainerComponent } from './users/user-list/user-list-container.component';
import { LoginContainerComponent } from './login/login-container.component';
import { UserEditContainerComponent } from './users/user-edit/user-edit-container.component';
import { ProductListContainerComponent } from './products/product-list/product-list-container.component';
import { ProductEditContainerComponent } from './products/product-edit/product-edit-container.component';


const routes: Routes = [
  { path: '', component: LoginContainerComponent },
  { path: 'user-list', component: UserListContainerComponent },
  { path: 'user-edit', component: UserEditContainerComponent },
  { path: 'product-list', component: ProductListContainerComponent},
  { path: 'product-edit', component: ProductEditContainerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
