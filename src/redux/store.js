import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

// reducer
import reducers from './reducers';

const middleware = getDefaultMiddleware({
  immutableCheck: true,
  serializableCheck: true,
  thunk: true,
});

export const store = configureStore({
  reducer: reducers,
  middleware,
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
