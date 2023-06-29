import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import logger from 'redux-logger';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';

import {persistReducer, persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import reducers from './redux.reducer';

export const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
};

export const preducers = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: preducers,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware: Function) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(logger),
});

export const persistor = persistStore(store);

export const ReduxProvider = (Component: any) => {
  return (props: any) => (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Component {...props} />
      </PersistGate>
    </Provider>
  );
};

ReduxProvider.displayName = 'ReduxProvider';
