import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { ShieldAlert, ArrowLeft, Home } from 'lucide-react';

export const Unauthorized: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      <div className="glass-card rounded-3xl p-8 sm:p-10 max-w-md w-full text-center border border-rose-500/20 shadow-2xl relative overflow-hidden">
        <div className="h-16 w-16 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center mx-auto mb-4">
          <ShieldAlert className="h-8 w-8" />
        </div>

        <h1 className="text-2xl font-bold text-white mb-2">Access Denied</h1>
        <p className="text-xs sm:text-sm text-slate-400 mb-6">
          You are currently signed in as{' '}
          <span className="font-bold text-indigo-400 uppercase">
            {user?.role || 'Guest'}
          </span>
          . This portal requires elevated or different permissions.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 text-xs font-semibold"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Go Back</span>
          </Link>
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold"
          >
            <Home className="h-4 w-4" />
            <span>Portal Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
