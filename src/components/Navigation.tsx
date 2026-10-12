import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { UserRole } from '@/types/auth';
import {
  LayoutDashboard,
  User,
  BookOpen,
  LineChart,
  Briefcase,
  ClipboardList,
  PlusCircle,
  Users,
  TrendingUp,
  BarChart3,
  Download,
  Compass,
  LogIn,
  UserPlus,
} from 'lucide-react';

export interface NavItem {
  label: string;
  path: string;
  icon: React.ElementType;
  badge?: string;
  roles?: UserRole[];
}

export const getNavItemsForRole = (role?: UserRole): NavItem[] => {
  if (!role) {
    return [
      { label: 'Explore', path: '/', icon: Compass },
      { label: 'Sign In', path: '/login', icon: LogIn },
      { label: 'Register', path: '/register', icon: UserPlus },
    ];
  }

  if (role === 'student') {
    return [
      { label: 'Dashboard', path: '/student/dashboard', icon: LayoutDashboard },
      { label: 'My Profile', path: '/student/profile', icon: User },
      { label: 'Assessments', path: '/student/assessments', icon: BookOpen },
      { label: 'Skill Gap', path: '/student/skill-gap', icon: LineChart },
      { label: 'Opportunities', path: '/student/opportunities', icon: Briefcase },
      { label: 'Applications', path: '/student/applications', icon: ClipboardList },
    ];
  }

  if (role === 'recruiter') {
    return [
      { label: 'Dashboard', path: '/recruiter/dashboard', icon: LayoutDashboard },
      { label: 'Post Job', path: '/recruiter/postings/new', icon: PlusCircle },
      { label: 'Manage Postings', path: '/recruiter/postings', icon: Briefcase },
      { label: 'Applicants', path: '/recruiter/applicants', icon: Users },
    ];
  }

  if (role === 'admin') {
    return [
      { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
      { label: 'Placements', path: '/admin/placements', icon: TrendingUp },
      { label: 'Analytics', path: '/admin/reports', icon: BarChart3 },
      { label: 'Data Export', path: '/admin/export', icon: Download },
    ];
  }

  return [];
};

interface NavigationProps {
  orientation?: 'horizontal' | 'vertical';
  onItemClick?: () => void;
  className?: string;
}

export const Navigation: React.FC<NavigationProps> = ({
  orientation = 'vertical',
  onItemClick,
  className = '',
}) => {
  const { user, isAuthenticated } = useAuth();
  const navItems = getNavItemsForRole(isAuthenticated ? user?.role : undefined);

  if (orientation === 'horizontal') {
    return (
      <nav className={`flex items-center space-x-1 ${className}`}>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onItemClick}
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 shadow-sm shadow-indigo-600/10'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`
              }
            >
              <Icon className="h-4 w-4 flex-shrink-0" />
              <span>{item.label}</span>
              {item.badge && (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>
    );
  }

  return (
    <nav className={`space-y-1.5 ${className}`}>
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={onItemClick}
            className={({ isActive }) =>
              `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25 font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/80'
              }`
            }
          >
            <div className="flex items-center gap-3">
              <Icon className="h-4 w-4 flex-shrink-0 transition-transform group-hover:scale-110" />
              <span>{item.label}</span>
            </div>
            {item.badge && (
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-900/60 text-indigo-300 border border-indigo-500/20">
                {item.badge}
              </span>
            )}
          </NavLink>
        );
      })}
    </nav>
  );
};

export default Navigation;
