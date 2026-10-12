import { describe, it, expect, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from '@/components/LoginForm';
import { renderWithProviders } from './test-utils';

describe('LoginForm Component', () => {
  it('renders login form inputs and submit button', () => {
    renderWithProviders(<LoginForm />);

    expect(screen.getByRole('heading', { name: /welcome back/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('validates empty inputs and displays error messages', async () => {
    renderWithProviders(<LoginForm />);
    const submitBtn = screen.getByRole('button', { name: /sign in/i });

    await userEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/email address is required/i)).toBeInTheDocument();
      expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    });
  });

  it('validates invalid email format', async () => {
    renderWithProviders(<LoginForm />);
    const emailInput = screen.getByLabelText(/email address/i);
    const submitBtn = screen.getByRole('button', { name: /sign in/i });

    await userEvent.type(emailInput, 'invalid-email-string');
    await userEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
    });
  });

  it('validates minimum password length', async () => {
    renderWithProviders(<LoginForm />);
    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText(/^password/i);
    const submitBtn = screen.getByRole('button', { name: /sign in/i });

    await userEvent.type(emailInput, 'student@campus.edu');
    await userEvent.type(passwordInput, '123');
    await userEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/password must be at least 6 characters/i)).toBeInTheDocument();
    });
  });

  it('toggles password visibility', async () => {
    renderWithProviders(<LoginForm />);
    const passwordInput = screen.getByLabelText(/^password/i) as HTMLInputElement;
    const toggleBtn = screen.getByRole('button', { name: /show password/i });

    expect(passwordInput.type).toBe('password');
    await userEvent.click(toggleBtn);
    expect(passwordInput.type).toBe('text');
  });

  it('successfully submits valid form and calls onSuccess', async () => {
    const handleSuccess = vi.fn();
    renderWithProviders(<LoginForm onSuccess={handleSuccess} />);

    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText(/^password/i);
    const submitBtn = screen.getByRole('button', { name: /sign in/i });

    await userEvent.type(emailInput, 'alex@campus.edu');
    await userEvent.type(passwordInput, 'validPass123');
    await userEvent.click(submitBtn);

    await waitFor(() => {
      expect(handleSuccess).toHaveBeenCalledTimes(1);
    });
  });
});
