import React, { ReactNode } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/store/authSlice';
import profileReducer from '@/store/slices/profileSlice';
import opportunityReducer from '@/store/slices/opportunitySlice';
import notificationReducer from '@/store/slices/notificationSlice';
import { BrowserRouter } from 'react-router-dom';

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = configureStore({
      reducer: {
        auth: authReducer,
        profile: profileReducer,
        opportunities: opportunityReducer,
        notifications: notificationReducer,
      },
      preloadedState,
    }),
    ...renderOptions
  }: { preloadedState?: Record<string, unknown>; store?: ReturnType<typeof configureStore> } & Omit<RenderOptions, 'wrapper'> = {}
) {
  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <Provider store={store}>
        <BrowserRouter>{children}</BrowserRouter>
      </Provider>
    );
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
