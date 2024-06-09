import { createSlice } from '@reduxjs/toolkit';
import type { InputOnImageProps } from 'domain/models';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface CanvasImage {
  url: string | null;
  inputOnImage: InputOnImageProps[];
  itemSelected: number | null;
}

const initialState: CanvasImage = {
  inputOnImage: [],
  itemSelected: null,
  url: null
};

const CanvasImageSlice = createSlice({
  initialState,
  name: 'canvasImage',
  reducers: {
    setCanvasImage(state: CanvasImage, action: PayloadAction<Partial<CanvasImage>>) {
      state.inputOnImage =
        typeof action.payload.inputOnImage === 'undefined'
          ? state.inputOnImage
          : action.payload.inputOnImage;

      state.url = typeof action.payload.url === 'undefined' ? state.url : action.payload.url;
      state.itemSelected =
        typeof action.payload.itemSelected === 'undefined'
          ? state.itemSelected
          : action.payload.itemSelected;
    }
  }
});

export default CanvasImageSlice.reducer;

export const {
  reducer: canvasImageReducer,
  actions: { setCanvasImage }
} = CanvasImageSlice;
