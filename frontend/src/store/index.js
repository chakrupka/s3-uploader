import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import createErrorSlice from './error-slice';

const useStore = create(
  devtools(
    immer((...args) => ({
      errorSlice: createErrorSlice(...args),
    })),
  ),
);
export default useStore;
