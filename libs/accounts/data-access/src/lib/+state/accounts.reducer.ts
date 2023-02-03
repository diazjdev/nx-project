import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as AccountsActions from './accounts.actions';
import { AccountsEntity } from './accounts.models';

export const ACCOUNTS_FEATURE_KEY = 'accounts';

export interface State extends EntityState<AccountsEntity> {
  selectedId?: string | number; // which Accounts record has been selected
  loaded: boolean; // has the Accounts list been loaded
  error?: string | null; // last known error (if any)
}

export interface AccountsPartialState {
  readonly [ACCOUNTS_FEATURE_KEY]: State;
}

export const accountsAdapter: EntityAdapter<AccountsEntity> =
  createEntityAdapter<AccountsEntity>();

export const initialState: State = accountsAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const accountsReducer = createReducer(
  initialState,
  on(AccountsActions.init, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(AccountsActions.loadAccountsSuccess, (state, { accounts }) =>
    accountsAdapter.setAll(accounts, { ...state, loaded: true })
  ),
  on(AccountsActions.loadAccountsFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return accountsReducer(state, action);
}
