import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StudentProfile, DocumentMetadata } from '@/types';

interface ProfileState {
  profile: StudentProfile | null;
  documents: DocumentMetadata[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  profile: null,
  documents: [],
  isLoading: false,
  error: null,
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfileStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    setProfile: (state, action: PayloadAction<StudentProfile>) => {
      state.profile = action.payload;
      state.documents = action.payload.documents || [];
      state.isLoading = false;
      state.error = null;
    },
    updateProfile: (state, action: PayloadAction<Partial<StudentProfile>>) => {
      if (state.profile) {
        state.profile = { ...state.profile, ...action.payload };
      }
    },
    setProfileError: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    setDocuments: (state, action: PayloadAction<DocumentMetadata[]>) => {
      state.documents = action.payload;
      if (state.profile) {
        state.profile.documents = action.payload;
      }
    },
    addDocument: (state, action: PayloadAction<DocumentMetadata>) => {
      state.documents.push(action.payload);
      if (state.profile) {
        state.profile.documents = state.documents;
      }
    },
    removeDocument: (state, action: PayloadAction<string>) => {
      state.documents = state.documents.filter((doc) => doc.id !== action.payload);
      if (state.profile) {
        state.profile.documents = state.documents;
      }
    },
  },
});

export const {
  setProfileStart,
  setProfile,
  updateProfile,
  setProfileError,
  setDocuments,
  addDocument,
  removeDocument,
} = profileSlice.actions;

export default profileSlice.reducer;
