import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromAccounts from './+state/accounts.reducer';
import { AccountsEffects } from './+state/accounts.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromAccounts.ACCOUNTS_FEATURE_KEY,
      fromAccounts.reducer
    ),
    EffectsModule.forFeature([AccountsEffects]),
  ],
})
export class AccountsDataAccessModule {}
