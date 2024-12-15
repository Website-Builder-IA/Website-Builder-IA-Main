import React from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Globe, ArrowRight } from 'lucide-react';

export function Dashboard() {
  const recentPages = [
    { id: 1, name: 'Landing Page Principal', status: 'online', visits: 1234 },
    { id: 2, name: 'Página de Produtos', status: 'draft', visits: 0 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <Link
          to="/dashboard/new"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <PlusCircle className="h-5 w-5 mr-2" />
          Nova Landing Page
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Landing Pages</h3>
            <Globe className="h-6 w-6 text-blue-600" />
          </div>
          <p className="mt-2 text-3xl font-bold text-gray-900">2</p>
          <p className="text-sm text-gray-500">Total de páginas criadas</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Visualizações</h3>
            <Globe className="h-6 w-6 text-blue-600" />
          </div>
          <p className="mt-2 text-3xl font-bold text-gray-900">1,234</p>
          <p className="text-sm text-gray-500">Últimos 30 dias</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Conversões</h3>
            <Globe className="h-6 w-6 text-blue-600" />
          </div>
          <p className="mt-2 text-3xl font-bold text-gray-900">15%</p>
          <p className="text-sm text-gray-500">Taxa média de conversão</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900">Landing Pages Recentes</h2>
          <div className="mt-4 space-y-4">
            {recentPages.map((page) => (
              <div
                key={page.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div>
                  <h3 className="font-medium text-gray-900">{page.name}</h3>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    page.status === 'online' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {page.status === 'online' ? 'Online' : 'Rascunho'}
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-500">{page.visits} visitas</span>
                  <Link
                    to={`/dashboard/pages/${page.id}`}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}