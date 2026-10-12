import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import {
  Briefcase,
  Users,
  PlusCircle,
  FileCheck,
  TrendingUp,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export const RecruiterDashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 border border-violet-500/20 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-semibold">
              <Sparkles className="h-3 w-3" />
              Recruiter Desk Active
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Recruiter Workspace — {user?.name || 'Recruiter'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
              Post new hiring requirements, filter applicants based on skill gap match percentages, and manage recruitment stages.
            </p>
          </div>

          <Link
            to="/recruiter/postings/new"
            className="px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs shadow-lg shadow-violet-600/20 flex items-center gap-2 transition-all shrink-0"
          >
            <PlusCircle className="h-4 w-4" />
            <span>Create New Job Posting</span>
          </Link>
        </div>
      </div>

      {/* Recruiter Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Active Postings</span>
            <Briefcase className="h-4 w-4 text-violet-400" />
          </div>
          <p className="text-2xl font-bold text-white">5 Active</p>
          <p className="text-[11px] text-slate-400">Total 8 posted this season</p>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Total Applicants</span>
            <Users className="h-4 w-4 text-indigo-400" />
          </div>
          <p className="text-2xl font-bold text-white">142 Candidates</p>
          <p className="text-[11px] text-indigo-400 font-medium">28 applied in last 48 hours</p>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Shortlisted Talent</span>
            <FileCheck className="h-4 w-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-bold text-white">36 Qualified</p>
          <p className="text-[11px] text-emerald-400 font-medium">Match score &gt; 80%</p>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Offers Released</span>
            <TrendingUp className="h-4 w-4 text-blue-400" />
          </div>
          <p className="text-2xl font-bold text-white">12 Offers</p>
          <p className="text-[11px] text-blue-400 font-medium">10 accepted</p>
        </div>
      </div>

      {/* Quick Action Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          to="/recruiter/postings"
          className="glass-card glass-card-hover rounded-2xl p-6 border border-slate-800 block group"
        >
          <div className="h-10 w-10 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Briefcase className="h-5 w-5" />
          </div>
          <h3 className="text-sm font-bold text-white mb-1">Manage Job Postings</h3>
          <p className="text-xs text-slate-400 mb-4">
            View active listings, update candidate skill criteria, and close completed recruitment drives.
          </p>
          <span className="text-xs text-violet-400 font-semibold flex items-center gap-1">
            Open Postings <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </Link>

        <Link
          to="/recruiter/applicants"
          className="glass-card glass-card-hover rounded-2xl p-6 border border-slate-800 block group"
        >
          <div className="h-10 w-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Users className="h-5 w-5" />
          </div>
          <h3 className="text-sm font-bold text-white mb-1">Applicant Match Filtering</h3>
          <p className="text-xs text-slate-400 mb-4">
            Screen student profiles ranked by algorithmic skill match percentage against your job requirements.
          </p>
          <span className="text-xs text-indigo-400 font-semibold flex items-center gap-1">
            Review Applicants <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </Link>

        <Link
          to="/recruiter/postings/new"
          className="glass-card glass-card-hover rounded-2xl p-6 border border-slate-800 block group"
        >
          <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <PlusCircle className="h-5 w-5" />
          </div>
          <h3 className="text-sm font-bold text-white mb-1">Publish New Opening</h3>
          <p className="text-xs text-slate-400 mb-4">
            Create standard recruitment postings with title, package, role description, and required skill stack.
          </p>
          <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
            Post Role <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </Link>
      </div>
    </div>
  );
};

export default RecruiterDashboard;
