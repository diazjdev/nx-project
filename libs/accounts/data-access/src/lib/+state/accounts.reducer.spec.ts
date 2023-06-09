import { Action } from '@ngrx/store';

import * as AccountsActions from './accounts.actions';
import { AccountsEntity } from './accounts.models';
import { State, initialState, reducer } from './accounts.reducer';

describe('Accounts Reducer', () => {
  const createAccountsEntity = (id: string, name = ''): AccountsEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Accounts actions', () => {
    it('loadAccountsSuccess should return the list of known Accounts', () => {
      const accounts = [
        createAccountsEntity('PRODUCT-AAA'),
        createAccountsEntity('PRODUCT-zzz'),
      ];
      const action = AccountsActions.loadAccountsSuccess({ accounts });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
