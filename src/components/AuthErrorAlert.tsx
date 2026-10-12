import React from 'react';
import { AlertCircle, X } from 'lucide-react';

interface AuthErrorAlertProps {
  error: string | null;
  onDismiss?: () => void;
  className?: string;
}

export const AuthErrorAlert: React.FC<AuthErrorAlertProps> = ({
  error,
  onDismiss,
  className = '',
}) => {
  if (!error) return null;

  return (
    <div
      role="alert"
      className={`flex items-start gap-3 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-sm animate-in fade-in duration-200 ${className}`}
    >
      <AlertCircle className="h-5 w-5 text-rose-400 flex-shrink-0 mt-0.5" />
      <div className="flex-1 font-medium leading-relaxed">{error}</div>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="text-rose-400 hover:text-rose-200 transition-colors p-0.5 rounded-md hover:bg-rose-500/20"
          aria-label="Dismiss error"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export default AuthErrorAlert;
