import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IFile {
  resumeFile: File | null;
}

const initialState: IFile = {
  resumeFile: null,
};

const resumeSlice = createSlice({
  name: "resume",
  initialState: initialState,
  reducers: {
    storeResumeFile: (state, action: PayloadAction<File>) => {
      state.resumeFile = action.payload;
    },
  },
});

export const { storeResumeFile } = resumeSlice.actions;

export default resumeSlice.reducer;
