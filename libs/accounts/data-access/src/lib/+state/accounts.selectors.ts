import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  ACCOUNTS_FEATURE_KEY,
  State,
  accountsAdapter,
} from './accounts.reducer';

// Lookup the 'Accounts' feature state managed by NgRx
export const getAccountsState =
  createFeatureSelector<State>(ACCOUNTS_FEATURE_KEY);

const { selectAll, selectEntities } = accountsAdapter.getSelectors();

export const getAccountsLoaded = createSelector(
  getAccountsState,
  (state: State) => state.loaded
);

export const getAccountsError = createSelector(
  getAccountsState,
  (state: State) => state.error
);

export const getAllAccounts = createSelector(getAccountsState, (state: State) =>
  selectAll(state)
);

export const getAccountsEntities = createSelector(
  getAccountsState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getAccountsState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getAccountsEntities,
  getSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
