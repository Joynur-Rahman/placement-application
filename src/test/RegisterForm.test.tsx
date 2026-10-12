import { describe, it, expect, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RegisterForm from '@/components/RegisterForm';
import { renderWithProviders } from './test-utils';

describe('RegisterForm Component', () => {
  it('renders register form inputs, role options, and submit button', () => {
    renderWithProviders(<RegisterForm />);

    expect(screen.getByRole('heading', { name: /create account/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/campus or work email/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /student/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /recruiter/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /admin/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/^password \*/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument();
  });

  it('validates empty inputs and displays error messages', async () => {
    renderWithProviders(<RegisterForm />);
    const submitBtn = screen.getByRole('button', { name: /create account/i });

    await userEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/full name must be at least 2 characters/i)).toBeInTheDocument();
      expect(screen.getByText(/email address is required/i)).toBeInTheDocument();
      expect(screen.getByText(/password must be at least 6 characters/i)).toBeInTheDocument();
    });
  });

  it('validates password and confirmPassword mismatch', async () => {
    renderWithProviders(<RegisterForm />);
    const nameInput = screen.getByLabelText(/full name/i);
    const emailInput = screen.getByLabelText(/campus or work email/i);
    const passwordInput = screen.getByLabelText(/^password \*/i);
    const confirmInput = screen.getByLabelText(/confirm password/i);
    const submitBtn = screen.getByRole('button', { name: /create account/i });

    await userEvent.type(nameInput, 'Jordan Lee');
    await userEvent.type(emailInput, 'jordan@campus.edu');
    await userEvent.type(passwordInput, 'secret123');
    await userEvent.type(confirmInput, 'different123');
    await userEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();
    });
  });

  it('allows selecting different roles', async () => {
    renderWithProviders(<RegisterForm />);
    const recruiterBtn = screen.getByRole('button', { name: /recruiter/i });

    await userEvent.click(recruiterBtn);
    expect(recruiterBtn.className).toContain('bg-indigo-600/20');
  });

  it('successfully submits valid registration', async () => {
    const handleSuccess = vi.fn();
    renderWithProviders(<RegisterForm onSuccess={handleSuccess} />);

    const nameInput = screen.getByLabelText(/full name/i);
    const emailInput = screen.getByLabelText(/campus or work email/i);
    const passwordInput = screen.getByLabelText(/^password \*/i);
    const confirmInput = screen.getByLabelText(/confirm password/i);
    const submitBtn = screen.getByRole('button', { name: /create account/i });

    await userEvent.type(nameInput, 'Alex Morgan');
    await userEvent.type(emailInput, 'alex.m@campus.edu');
    await userEvent.type(passwordInput, 'password123');
    await userEvent.type(confirmInput, 'password123');
    await userEvent.click(submitBtn);

    await waitFor(() => {
      expect(handleSuccess).toHaveBeenCalledTimes(1);
    });
  });
});
