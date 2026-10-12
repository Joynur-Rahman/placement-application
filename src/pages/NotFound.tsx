import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Compass, ArrowLeft, Home, Search } from 'lucide-react';

export const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="glass-card rounded-3xl p-8 sm:p-12 max-w-lg w-full text-center relative overflow-hidden shadow-2xl border border-indigo-500/20">
        {/* Decorative background glow */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* 404 Badge */}
        <div className="inline-flex items-center justify-center h-20 w-20 rounded-3xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 mb-6 shadow-inner">
          <Compass className="h-10 w-10 animate-pulse" />
        </div>

        <div className="space-y-3 mb-8">
          <span className="text-xs font-bold tracking-widest text-indigo-400 uppercase bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
            Error 404
          </span>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Page Not Found
          </h1>
          <p className="text-sm text-slate-400 max-w-sm mx-auto leading-relaxed">
            The placement opportunity, assessment, or campus section you are looking for does not exist or may have been relocated.
          </p>
        </div>

        {/* Navigation Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Go Back</span>
          </button>

          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Home className="h-4 w-4" />
            <span>Return to Portal</span>
          </Link>
        </div>

        {/* Quick Helper Links */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 flex items-center justify-center gap-6 text-xs text-slate-400">
          <Link to="/student/opportunities" className="hover:text-indigo-400 transition-colors flex items-center gap-1">
            <Search className="h-3.5 w-3.5" />
            <span>Find Jobs</span>
          </Link>
          <Link to="/login" className="hover:text-indigo-400 transition-colors">
            <span>Sign In</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
