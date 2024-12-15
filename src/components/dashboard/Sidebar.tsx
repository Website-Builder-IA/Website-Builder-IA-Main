import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  PlusCircle,
  Globe,
  Settings,
  Database,
  FileEdit,
  Users,
  HelpCircle,
  ChevronRight
} from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: PlusCircle, label: 'Nova Landing Page', path: '/dashboard/new' },
  { icon: Globe, label: 'Landing Pages Ativas', path: '/dashboard/pages' },
  { icon: Database, label: 'Hospedagem e Domínio', path: '/dashboard/hosting' },
  { icon: FileEdit, label: 'Templates', path: '/dashboard/templates' },
  { icon: Users, label: 'Integrações', path: '/dashboard/integrations' },
  { icon: Settings, label: 'Configurações', path: '/dashboard/settings' },
  { icon: HelpCircle, label: 'Ajuda', path: '/dashboard/help' },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <div className="w-64 bg-white h-full shadow-lg">
      <div className="p-4">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span className="flex-1">{item.label}</span>
                <ChevronRight className={`h-4 w-4 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}