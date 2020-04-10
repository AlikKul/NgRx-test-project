import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserEditComponent } from './user-edit/user-edit.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserListContainerComponent } from './user-list/user-list-container.component';

// NgRx
import { StoreModule } from '@ngrx/store';
import { reducer } from './state/users.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UsersEffects } from './state/users.effects';
import { UserEditContainerComponent } from './user-edit/user-edit-container.component';

@NgModule({
  imports: [
    StoreModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature('users', reducer),
    EffectsModule.forFeature([UsersEffects])
  ],
  declarations: [
    UserEditComponent,
    UserListComponent,
    UserListContainerComponent,
    UserEditContainerComponent
  ]
})

export class UsersModule {}
