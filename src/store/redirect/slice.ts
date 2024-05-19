import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface RedirectState {
  path: string | null;
}

const initialState: RedirectState = {
  path: null
};

const redirectSlice = createSlice({
  initialState,
  name: 'redirect',
  reducers: {
    setRedirect(state: RedirectState, action: PayloadAction<{ path: string | null }>) {
      state.path = action.payload.path;
    }
  }
});

export const {
  reducer: redirectReducer,
  actions: { setRedirect }
} = redirectSlice;
