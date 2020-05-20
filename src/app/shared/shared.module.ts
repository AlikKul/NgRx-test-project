import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header/header.component';

// NgRx
import { StoreModule } from '@ngrx/store';
import { reducer } from './state/global.reducer';
import { EffectsModule } from '@ngrx/effects';
import { GlobalEffects } from './state/global.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('global', reducer),
    EffectsModule.forFeature([GlobalEffects])
  ],
  declarations: [
    HeaderComponent
  ],
  exports: [
    HeaderComponent
  ]
})

export class SharedModule {}
