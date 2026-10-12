import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import {
  GraduationCap,
  BookOpen,
  LineChart,
  Briefcase,
  ArrowRight,
  Sparkles,
  Award,
  CheckCircle2,
} from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 border border-blue-500/20 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
              <Sparkles className="h-3 w-3" />
              Student Portal Active
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Welcome back, {user?.name || 'Student'}!
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
              Track your verified profile, take assessments to uncover your skill gaps, and explore placement opportunities tailored to your strengths.
            </p>
          </div>

          <Link
            to="/student/profile"
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-lg shadow-blue-600/20 flex items-center gap-2 transition-all shrink-0"
          >
            <span>Edit Profile</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Profile Status</span>
            <Award className="h-4 w-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-bold text-white">85%</p>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full w-[85%]" />
          </div>
          <p className="text-[11px] text-emerald-400 font-medium">Resume & CGPA verified</p>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Assessments Done</span>
            <BookOpen className="h-4 w-4 text-indigo-400" />
          </div>
          <p className="text-2xl font-bold text-white">4 Completed</p>
          <p className="text-[11px] text-slate-400">Avg score: <span className="text-indigo-400 font-bold">82%</span></p>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Job Matches</span>
            <Briefcase className="h-4 w-4 text-purple-400" />
          </div>
          <p className="text-2xl font-bold text-white">12 Matched</p>
          <p className="text-[11px] text-purple-400 font-medium">&gt; 70% skill compatibility</p>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Applications</span>
            <CheckCircle2 className="h-4 w-4 text-blue-400" />
          </div>
          <p className="text-2xl font-bold text-white">3 Active</p>
          <p className="text-[11px] text-blue-400 font-medium">1 Shortlisted for interview</p>
        </div>
      </div>

      {/* Quick Action Navigation Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          to="/student/assessments"
          className="glass-card glass-card-hover rounded-2xl p-6 border border-slate-800 block group"
        >
          <div className="h-10 w-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <BookOpen className="h-5 w-5" />
          </div>
          <h3 className="text-sm font-bold text-white mb-1">Take Skill Assessments</h3>
          <p className="text-xs text-slate-400 mb-4">
            Evaluate your knowledge in Data Structures, Web Development, and Algorithms with timed tests.
          </p>
          <span className="text-xs text-indigo-400 font-semibold flex items-center gap-1">
            Start Test <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </Link>

        <Link
          to="/student/skill-gap"
          className="glass-card glass-card-hover rounded-2xl p-6 border border-slate-800 block group"
        >
          <div className="h-10 w-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <LineChart className="h-5 w-5" />
          </div>
          <h3 className="text-sm font-bold text-white mb-1">View Skill Gap Radar</h3>
          <p className="text-xs text-slate-400 mb-4">
            Compare your competency scores against benchmark requirements for target software roles.
          </p>
          <span className="text-xs text-purple-400 font-semibold flex items-center gap-1">
            Analyze Gaps <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </Link>

        <Link
          to="/student/opportunities"
          className="glass-card glass-card-hover rounded-2xl p-6 border border-slate-800 block group"
        >
          <div className="h-10 w-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <GraduationCap className="h-5 w-5" />
          </div>
          <h3 className="text-sm font-bold text-white mb-1">Explore Placement Drives</h3>
          <p className="text-xs text-slate-400 mb-4">
            Discover active campus recruitment listings, view CTC details, and submit 1-click applications.
          </p>
          <span className="text-xs text-blue-400 font-semibold flex items-center gap-1">
            Browse Drives <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </Link>
      </div>
    </div>
  );
};

export default StudentDashboard;
