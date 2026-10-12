import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import {
  TrendingUp,
  BarChart3,
  Download,
  Users,
  Briefcase,
  Building2,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 border border-emerald-500/20 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
              <Sparkles className="h-3 w-3" />
              Admin Operations Console
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Campus Placement Analytics — {user?.name || 'Administrator'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
              Monitor university-wide placement statistics, generate institutional audit reports, and oversee drive participation.
            </p>
          </div>

          <Link
            to="/admin/reports"
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-lg shadow-emerald-600/20 flex items-center gap-2 transition-all shrink-0"
          >
            <BarChart3 className="h-4 w-4" />
            <span>Generate Placement Report</span>
          </Link>
        </div>
      </div>

      {/* Admin Analytics KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Eligible Students</span>
            <Users className="h-4 w-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-bold text-white">1,248</p>
          <p className="text-[11px] text-emerald-400 font-medium">96% Profiles Verified</p>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Placement Rate</span>
            <TrendingUp className="h-4 w-4 text-indigo-400" />
          </div>
          <p className="text-2xl font-bold text-white">78.4%</p>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-indigo-500 h-full w-[78.4%]" />
          </div>
          <p className="text-[11px] text-slate-400">+5.2% vs previous academic year</p>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Hiring Partners</span>
            <Building2 className="h-4 w-4 text-purple-400" />
          </div>
          <p className="text-2xl font-bold text-white">64 Companies</p>
          <p className="text-[11px] text-purple-400 font-medium">22 Fortune 500 recruiters</p>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Active Opportunities</span>
            <Briefcase className="h-4 w-4 text-blue-400" />
          </div>
          <p className="text-2xl font-bold text-white">45 Drives</p>
          <p className="text-[11px] text-blue-400 font-medium">Average CTC: $85,000 / ₹12.5 LPA</p>
        </div>
      </div>

      {/* Admin Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          to="/admin/placements"
          className="glass-card glass-card-hover rounded-2xl p-6 border border-slate-800 block group"
        >
          <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <TrendingUp className="h-5 w-5" />
          </div>
          <h3 className="text-sm font-bold text-white mb-1">Placement Tracker</h3>
          <p className="text-xs text-slate-400 mb-4">
            Live pipeline tracking of student offers, branch-wise conversions, and drive status.
          </p>
          <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
            Open Tracker <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </Link>

        <Link
          to="/admin/reports"
          className="glass-card glass-card-hover rounded-2xl p-6 border border-slate-800 block group"
        >
          <div className="h-10 w-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <BarChart3 className="h-5 w-5" />
          </div>
          <h3 className="text-sm font-bold text-white mb-1">Analytics & Skill Reports</h3>
          <p className="text-xs text-slate-400 mb-4">
            Cross-departmental skill gap reports, curriculum alignment insights, and historical metrics.
          </p>
          <span className="text-xs text-indigo-400 font-semibold flex items-center gap-1">
            View Analytics <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </Link>

        <Link
          to="/admin/export"
          className="glass-card glass-card-hover rounded-2xl p-6 border border-slate-800 block group"
        >
          <div className="h-10 w-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Download className="h-5 w-5" />
          </div>
          <h3 className="text-sm font-bold text-white mb-1">Data Export Center</h3>
          <p className="text-xs text-slate-400 mb-4">
            Export student placements, drive participants, and company offers to CSV and Excel formats.
          </p>
          <span className="text-xs text-blue-400 font-semibold flex items-center gap-1">
            Export Data <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
