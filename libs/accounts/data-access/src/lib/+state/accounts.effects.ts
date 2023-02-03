import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as AccountsActions from './accounts.actions';
import * as AccountsFeature from './accounts.reducer';

@Injectable()
export class AccountsEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountsActions.init),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return AccountsActions.loadAccountsSuccess({ accounts: [] });
        },
        onError: (action, error) => {
          console.error('Error', error);
          return AccountsActions.loadAccountsFailure({ error });
        },
      })
    )
  );

  constructor(private readonly actions$: Actions) {}
}
