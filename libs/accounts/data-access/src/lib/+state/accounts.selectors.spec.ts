import { AccountsEntity } from './accounts.models';
import {
  accountsAdapter,
  AccountsPartialState,
  initialState,
} from './accounts.reducer';
import * as AccountsSelectors from './accounts.selectors';

describe('Accounts Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getAccountsId = (it: AccountsEntity) => it.id;
  const createAccountsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as AccountsEntity);

  let state: AccountsPartialState;

  beforeEach(() => {
    state = {
      accounts: accountsAdapter.setAll(
        [
          createAccountsEntity('PRODUCT-AAA'),
          createAccountsEntity('PRODUCT-BBB'),
          createAccountsEntity('PRODUCT-CCC'),
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Accounts Selectors', () => {
    it('getAllAccounts() should return the list of Accounts', () => {
      const results = AccountsSelectors.getAllAccounts(state);
      const selId = getAccountsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = AccountsSelectors.getSelected(state) as AccountsEntity;
      const selId = getAccountsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getAccountsLoaded() should return the current "loaded" status', () => {
      const result = AccountsSelectors.getAccountsLoaded(state);

      expect(result).toBe(true);
    });

    it('getAccountsError() should return the current "error" state', () => {
      const result = AccountsSelectors.getAccountsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
