import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  User as UserIcon, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  GraduationCap, 
  Briefcase, 
  ShieldCheck, 
  Loader2, 
  ArrowRight,
  Check
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store';
import { register as registerAction, setLoading, setError, clearError } from '@/store/authSlice';
import { authService } from '@/services/authService';
import AuthErrorAlert from './AuthErrorAlert';
import { AuthResponse, UserRole } from '@/types/auth';

const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, 'Full name must be at least 2 characters')
      .max(60, 'Full name cannot exceed 60 characters'),
    email: z
      .string()
      .min(1, 'Email address is required')
      .email('Please enter a valid email address (e.g. name@campus.edu)'),
    role: z.enum(['student', 'recruiter', 'admin'] as const),
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters long'),
    confirmPassword: z
      .string()
      .min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;

interface RegisterFormProps {
  onSuccess?: (authResponse: AuthResponse) => void;
  onSwitchToLogin?: () => void;
  className?: string;
}

const ROLES: { id: UserRole; title: string; desc: string; icon: React.ElementType }[] = [
  {
    id: 'student',
    title: 'Student',
    desc: 'Take assessments, discover jobs, bridge gaps',
    icon: GraduationCap,
  },
  {
    id: 'recruiter',
    title: 'Recruiter',
    desc: 'Post roles, source matched talent',
    icon: Briefcase,
  },
  {
    id: 'admin',
    title: 'Admin',
    desc: 'Placement tracking and campus analytics',
    icon: ShieldCheck,
  },
];

export const RegisterForm: React.FC<RegisterFormProps> = ({
  onSuccess,
  onSwitchToLogin,
  className = '',
}) => {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      role: 'student',
      password: '',
      confirmPassword: '',
    },
  });

  const selectedRole = watch('role');

  const onSubmit = async (data: RegisterFormData) => {
    dispatch(setLoading(true));
    try {
      const response = await authService.register({
        name: data.name,
        email: data.email,
        role: data.role,
        password: data.password,
      });
      dispatch(registerAction(response));
      onSuccess?.(response);
    } catch (err: unknown) {
      const errorMsg =
        err instanceof Error ? err.message : 'Registration failed. Please try again.';
      dispatch(setError(errorMsg));
    }
  };

  return (
    <div
      className={`glass-card rounded-2xl p-6 sm:p-8 w-full max-w-lg mx-auto shadow-2xl relative overflow-hidden ${className}`}
    >
      {/* Decorative top accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

      <div className="mb-6 text-center space-y-1">
        <h2 className="text-2xl font-bold tracking-tight text-white">Create Account</h2>
        <p className="text-xs sm:text-sm text-slate-400">
          Join SmartCampus to accelerate your placement journey
        </p>
      </div>

      {/* Global Error Banner */}
      {error && (
        <div className="mb-5">
          <AuthErrorAlert error={error} onDismiss={() => dispatch(clearError())} />
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        {/* Role Selection */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-slate-300">
            Select Your Role <span className="text-rose-400">*</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {ROLES.map((roleItem) => {
              const Icon = roleItem.icon;
              const isSelected = selectedRole === roleItem.id;
              return (
                <button
                  type="button"
                  key={roleItem.id}
                  onClick={() => setValue('role', roleItem.id, { shouldValidate: true })}
                  className={`p-3 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                    isSelected
                      ? 'bg-indigo-600/20 border-indigo-500 shadow-md shadow-indigo-600/20'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-850'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1.5">
                    <div
                      className={`p-1.5 rounded-lg ${
                        isSelected ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    {isSelected && (
                      <div className="h-4 w-4 rounded-full bg-indigo-500 flex items-center justify-center text-white">
                        <Check className="h-2.5 w-2.5 stroke-[3]" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                      {roleItem.title}
                    </h4>
                    <p className="text-[10px] text-slate-400 line-clamp-2 leading-tight mt-0.5">
                      {roleItem.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
          {errors.role && (
            <p className="text-xs text-rose-400 font-medium pl-1 animate-in fade-in">
              {errors.role.message}
            </p>
          )}
        </div>

        {/* Full Name */}
        <div className="space-y-1.5">
          <label htmlFor="name" className="block text-xs font-semibold text-slate-300">
            Full Name <span className="text-rose-400">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <UserIcon className="h-4 w-4" />
            </div>
            <input
              id="name"
              type="text"
              autoComplete="name"
              placeholder="e.g. Alex Johnson"
              {...register('name')}
              className={`w-full pl-10 pr-4 py-2.5 bg-slate-900/80 border rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-colors ${
                errors.name
                  ? 'border-rose-500/80 focus:border-rose-400 focus:ring-1 focus:ring-rose-400/50'
                  : 'border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50'
              }`}
            />
          </div>
          {errors.name && (
            <p className="text-xs text-rose-400 font-medium pl-1 animate-in fade-in">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email Address */}
        <div className="space-y-1.5">
          <label htmlFor="reg-email" className="block text-xs font-semibold text-slate-300">
            Campus or Work Email <span className="text-rose-400">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Mail className="h-4 w-4" />
            </div>
            <input
              id="reg-email"
              type="email"
              autoComplete="email"
              placeholder="name@campus.edu"
              {...register('email')}
              className={`w-full pl-10 pr-4 py-2.5 bg-slate-900/80 border rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-colors ${
                errors.email
                  ? 'border-rose-500/80 focus:border-rose-400 focus:ring-1 focus:ring-rose-400/50'
                  : 'border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50'
              }`}
            />
          </div>
          {errors.email && (
            <p className="text-xs text-rose-400 font-medium pl-1 animate-in fade-in">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password & Confirm Password side by side */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Password */}
          <div className="space-y-1.5">
            <label htmlFor="reg-password" className="block text-xs font-semibold text-slate-300">
              Password <span className="text-rose-400">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Lock className="h-3.5 w-3.5" />
              </div>
              <input
                id="reg-password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                placeholder="••••••••"
                {...register('password')}
                className={`w-full pl-9 pr-9 py-2.5 bg-slate-900/80 border rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-colors ${
                  errors.password
                    ? 'border-rose-500/80 focus:border-rose-400 focus:ring-1 focus:ring-rose-400/50'
                    : 'border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-200 transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-[11px] text-rose-400 font-medium pl-1 animate-in fade-in">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-1.5">
            <label htmlFor="reg-confirm-password" className="block text-xs font-semibold text-slate-300">
              Confirm Password <span className="text-rose-400">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Lock className="h-3.5 w-3.5" />
              </div>
              <input
                id="reg-confirm-password"
                type={showConfirmPassword ? 'text' : 'password'}
                autoComplete="new-password"
                placeholder="••••••••"
                {...register('confirmPassword')}
                className={`w-full pl-9 pr-9 py-2.5 bg-slate-900/80 border rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-colors ${
                  errors.confirmPassword
                    ? 'border-rose-500/80 focus:border-rose-400 focus:ring-1 focus:ring-rose-400/50'
                    : 'border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-200 transition-colors"
                aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
              >
                {showConfirmPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-[11px] text-rose-400 font-medium pl-1 animate-in fade-in">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-3 py-2.5 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all disabled:opacity-60 disabled:cursor-not-allowed hover:shadow-indigo-600/50 active:scale-[0.99]"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Creating Account...</span>
            </>
          ) : (
            <>
              <span>Create Account</span>
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </form>

      {/* Switch to Login footer */}
      {onSwitchToLogin && (
        <div className="mt-6 pt-5 border-t border-slate-800/80 text-center">
          <p className="text-xs text-slate-400">
            Already have an account?{' '}
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors"
            >
              Sign In
            </button>
          </p>
        </div>
      )}
    </div>
  );
};

export default RegisterForm;
