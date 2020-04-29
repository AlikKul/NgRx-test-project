import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

import { UserEditComponent } from './user-edit/user-edit.component';
import { UserEditContainerComponent } from './user-edit/user-edit-container.component';
import { UserListComponent, NgbdSortableHeader } from './user-list/user-list.component';
import { UserListContainerComponent } from './user-list/user-list-container.component';

// NgRx
import { StoreModule } from '@ngrx/store';
import { reducer } from './state/users.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UsersEffects } from './state/users.effects';
import { UserPurchasesComponent } from './user-purchases/user-purchases.component';
import { UserPurchasesContainerComponent } from './user-purchases/user-purchases-container.component';

@NgModule({
  imports: [
    SharedModule,
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
    UserEditContainerComponent,
    NgbdSortableHeader,
    UserPurchasesComponent,
    UserPurchasesContainerComponent
  ]
})

export class UsersModule {}
