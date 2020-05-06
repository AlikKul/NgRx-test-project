import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductListContainerComponent } from './product-list/product-list-container.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductEditContainerComponent } from './product-edit/product-edit-container.component';

// NgRx
import { StoreModule } from '@ngrx/store';
import { reducer } from './state/products.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ProductsEffects } from './state/products.effects';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature('products', reducer),
    EffectsModule.forFeature([ProductsEffects])
  ],
  declarations: [
    ProductListComponent,
    ProductListContainerComponent,
    ProductEditComponent,
    ProductEditContainerComponent
  ]
})

export class ProductsModule {}
