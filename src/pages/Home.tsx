import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import {
  GraduationCap,
  Briefcase,
  LineChart,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Target,
  FileCheck,
  TrendingUp,
} from 'lucide-react';

export const Home: React.FC = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="space-y-12 py-4">
      {/* Hero section */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
          <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
          Smart Campus Placement & Skill Gap Intelligence
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Bridging Academic Learning with Industry Standards
        </h1>
        <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
          Continuous adaptive assessments, real-time skill gap visualizers, and data-driven opportunity matching tailored for students, campus recruiters, and placement officers.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {isAuthenticated && user ? (
            <Link
              to={
                user.role === 'student'
                  ? '/student/dashboard'
                  : user.role === 'recruiter'
                  ? '/recruiter/dashboard'
                  : '/admin/dashboard'
              }
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-lg shadow-indigo-600/30 transition-all hover:scale-105"
            >
              <span>Go to Your {user.role.toUpperCase()} Portal</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          ) : (
            <>
              <Link
                to="/register"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-lg shadow-indigo-600/30 transition-all hover:scale-105"
              >
                <span>Get Started (Register)</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-xs transition-all hover:scale-105"
              >
                <span>Sign In to Account</span>
              </Link>
            </>
          )}
        </div>
      </div>

      {/* 3 Portal Hub Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Student Portal Card */}
        <div className="glass-card glass-card-hover rounded-2xl p-6 relative flex flex-col justify-between">
          <div className="space-y-4">
            <div className="h-12 w-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Student Portal</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Build verified profiles, take skill assessments, identify knowledge gaps with radar charts, and track placement applications in real time.
              </p>
            </div>
          </div>
          <div className="pt-6 border-t border-slate-800/80 mt-6">
            <Link
              to="/student/dashboard"
              className="inline-flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 font-semibold"
            >
              <span>Explore Student Features</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Recruiter Desk Card */}
        <div className="glass-card glass-card-hover rounded-2xl p-6 relative flex flex-col justify-between">
          <div className="space-y-4">
            <div className="h-12 w-12 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-400 flex items-center justify-center">
              <Briefcase className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Recruiter Desk</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Publish job and internship opportunities, configure skill requirements, and filter pre-evaluated applicants ranked by match percentage.
              </p>
            </div>
          </div>
          <div className="pt-6 border-t border-slate-800/80 mt-6">
            <Link
              to="/recruiter/dashboard"
              className="inline-flex items-center gap-1.5 text-xs text-violet-400 hover:text-violet-300 font-semibold"
            >
              <span>Explore Recruiter Tools</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Admin Dashboard Card */}
        <div className="glass-card glass-card-hover rounded-2xl p-6 relative flex flex-col justify-between">
          <div className="space-y-4">
            <div className="h-12 w-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Admin Dashboard</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Campus-wide placement metrics, departmental performance graphs, exportable reports (CSV/Excel), and recruitment pipeline governance.
              </p>
            </div>
          </div>
          <div className="pt-6 border-t border-slate-800/80 mt-6">
            <Link
              to="/admin/dashboard"
              className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 font-semibold"
            >
              <span>Explore Admin Console</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Feature Highlights Grid */}
      <div className="glass-card rounded-3xl p-8 border border-slate-800 space-y-6">
        <div className="flex items-center gap-2.5">
          <LineChart className="h-5 w-5 text-indigo-400" />
          <h2 className="text-xl font-bold text-white">Core Capabilities</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <Target className="h-5 w-5 text-indigo-400" />
            <h4 className="text-xs font-bold text-white">Skill Gap Radar</h4>
            <p className="text-[11px] text-slate-400">
              Visualizes actual vs. required competency curves across languages and frameworks.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <FileCheck className="h-5 w-5 text-emerald-400" />
            <h4 className="text-xs font-bold text-white">Verified Profiles</h4>
            <p className="text-[11px] text-slate-400">
              Standardized resume and transcript uploads with CGPA validation and document history.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <TrendingUp className="h-5 w-5 text-blue-400" />
            <h4 className="text-xs font-bold text-white">Smart Match Scoring</h4>
            <p className="text-[11px] text-slate-400">
              Calculates real-time alignment percentage between candidate profiles and job requirements.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <Briefcase className="h-5 w-5 text-purple-400" />
            <h4 className="text-xs font-bold text-white">Recruitment Pipeline</h4>
            <p className="text-[11px] text-slate-400">
              End-to-end status tracking from applied, shortlisted, to interview and final offer.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
