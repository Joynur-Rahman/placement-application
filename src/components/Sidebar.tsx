import React from 'react';
import Navigation from './Navigation';
import { useAuth } from '@/hooks/useAuth';
import { GraduationCap, Briefcase, ShieldCheck, Sparkles } from 'lucide-react';

interface SidebarProps {
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ className = '' }) => {
  const { user, isAuthenticated } = useAuth();

  const getPortalInfo = () => {
    if (!isAuthenticated || !user) {
      return {
        title: 'Guest Portal',
        subtitle: 'Sign in to access your role features',
        icon: Sparkles,
        color: 'text-indigo-400',
        bg: 'bg-indigo-500/10 border-indigo-500/20',
      };
    }
    if (user.role === 'student') {
      return {
        title: 'Student Portal',
        subtitle: 'Skill Mastery & Career Tracks',
        icon: GraduationCap,
        color: 'text-blue-400',
        bg: 'bg-blue-500/10 border-blue-500/20',
      };
    }
    if (user.role === 'recruiter') {
      return {
        title: 'Recruiter Desk',
        subtitle: 'Talent Discovery & Sourcing',
        icon: Briefcase,
        color: 'text-violet-400',
        bg: 'bg-violet-500/10 border-violet-500/20',
      };
    }
    return {
      title: 'Admin Console',
      subtitle: 'Campus Operations & KPIs',
      icon: ShieldCheck,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/20',
    };
  };

  const portal = getPortalInfo();
  const Icon = portal.icon;

  return (
    <aside
      className={`w-64 glass-sidebar min-h-[calc(100vh-4rem)] flex flex-col justify-between p-4 ${className}`}
    >
      <div className="space-y-6">
        {/* Portal Info Card */}
        <div className={`p-3.5 rounded-2xl border ${portal.bg} flex items-center gap-3`}>
          <div className={`p-2 rounded-xl bg-slate-900/80 border border-slate-800 ${portal.color}`}>
            <Icon className="h-5 w-5" />
          </div>
          <div className="overflow-hidden">
            <h3 className="text-xs font-bold text-white tracking-tight truncate">
              {portal.title}
            </h3>
            <p className="text-[10px] text-slate-400 truncate">{portal.subtitle}</p>
          </div>
        </div>

        {/* Role Navigation */}
        <div className="space-y-1">
          <p className="text-[10px] uppercase font-bold text-slate-500 px-3 tracking-wider mb-2">
            Navigation Menu
          </p>
          <Navigation orientation="vertical" />
        </div>
      </div>

      {/* Footer Info in Sidebar */}
      <div className="pt-4 border-t border-slate-800/80">
        <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800 text-center space-y-1">
          <p className="text-[11px] font-semibold text-slate-300">Need Guidance?</p>
          <p className="text-[10px] text-slate-400">View placement documentation and assessment guidelines.</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
