import { canvasImageReducer } from './canvas-image/slice';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import { persistReducer as persistedReducer } from './persist/slice';
import { redirectReducer } from './redirect/slice';
import { sidebarReducer } from './sidebar/slice';
import { useSelector } from 'react-redux';
import storage from 'redux-persist/lib/storage';
import thunkMiddleware from 'redux-thunk';
import type { TypedUseSelectorHook } from 'react-redux';

const persistConfig = {
  key: 'root',
  storage
};

const persisted = persistReducer(persistConfig, persistedReducer);

const rootReducer = combineReducers({
  canvasImage: canvasImageReducer,
  persist: persisted,
  redirect: redirectReducer,
  sidebar: sidebarReducer
});

export const store = configureStore({ middleware: [thunkMiddleware], reducer: rootReducer });
export const persister = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
