import { ActionReducer, MetaReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';

export function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({
    keys: ['auth', 'user', 'profile'],
    rehydrate: true,
  })(reducer);
}

export const metaReducers: MetaReducer<any>[] = [localStorageSyncReducer];
