import React, { useState } from 'react';
import { Building2 } from 'lucide-react';
import { businessTypes } from '../../constants';

interface BusinessInfoStepProps {
  onNext: (data: any) => void;
  data?: any;
}

export function BusinessInfoStep({ onNext, data }: BusinessInfoStepProps) {
  const [businessInfo, setBusinessInfo] = useState({
    name: data?.name || '',
    type: data?.type || '',
    description: data?.description || '',
    customType: data?.customType || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({
      ...businessInfo,
      type: businessInfo.type === 'Outro' ? businessInfo.customType : businessInfo.type,
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="text-center mb-8">
        <Building2 className="w-12 h-12 mx-auto text-blue-600 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900">Conte-nos sobre seu negócio</h2>
        <p className="mt-2 text-gray-600">Vamos começar com as informações básicas</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nome do Negócio
          </label>
          <input
            type="text"
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={businessInfo.name}
            onChange={(e) =>
              setBusinessInfo({ ...businessInfo, name: e.target.value })
            }
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Tipo de Negócio
          </label>
          <select
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={businessInfo.type}
            onChange={(e) =>
              setBusinessInfo({ ...businessInfo, type: e.target.value })
            }
          >
            <option value="">Selecione o tipo de negócio</option>
            {businessTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {businessInfo.type === 'Outro' && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Especifique o tipo de negócio
            </label>
            <input
              type="text"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={businessInfo.customType}
              onChange={(e) =>
                setBusinessInfo({ ...businessInfo, customType: e.target.value })
              }
              placeholder="Digite o tipo do seu negócio"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Descrição do Negócio
          </label>
          <textarea
            required
            rows={4}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={businessInfo.description}
            onChange={(e) =>
              setBusinessInfo({ ...businessInfo, description: e.target.value })
            }
            placeholder="Conte-nos sobre seu negócio, sua missão e o que o torna único..."
          />
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Continuar
        </button>
      </form>
    </div>
  );
}