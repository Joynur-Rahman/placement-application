import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { JobOpportunity } from '@/types';

interface OpportunityFilters {
  searchTerm: string;
  location?: string;
  type?: string;
  minMatchScore?: number;
}

interface OpportunityState {
  items: JobOpportunity[];
  selectedOpportunity: JobOpportunity | null;
  filters: OpportunityFilters;
  isLoading: boolean;
  error: string | null;
}

const initialState: OpportunityState = {
  items: [],
  selectedOpportunity: null,
  filters: {
    searchTerm: '',
  },
  isLoading: false,
  error: null,
};

export const opportunitySlice = createSlice({
  name: 'opportunities',
  initialState,
  reducers: {
    setOpportunitiesStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    setOpportunities: (state, action: PayloadAction<JobOpportunity[]>) => {
      state.items = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setSelectedOpportunity: (state, action: PayloadAction<JobOpportunity | null>) => {
      state.selectedOpportunity = action.payload;
    },
    addOpportunity: (state, action: PayloadAction<JobOpportunity>) => {
      state.items.unshift(action.payload);
    },
    updateOpportunity: (state, action: PayloadAction<JobOpportunity>) => {
      const index = state.items.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
      if (state.selectedOpportunity?.id === action.payload.id) {
        state.selectedOpportunity = action.payload;
      }
    },
    setFilters: (state, action: PayloadAction<Partial<OpportunityFilters>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
    setOpportunityError: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  setOpportunitiesStart,
  setOpportunities,
  setSelectedOpportunity,
  addOpportunity,
  updateOpportunity,
  setFilters,
  resetFilters,
  setOpportunityError,
} = opportunitySlice.actions;

export default opportunitySlice.reducer;
