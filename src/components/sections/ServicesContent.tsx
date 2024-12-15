import React, { useState } from 'react';
import { ArrowLeft, Plus, X } from 'lucide-react';

interface ServicesContentProps {
  onSave: (content: any) => void;
  onBack: () => void;
  initialData?: any;
}

export function ServicesContent({ onSave, onBack, initialData }: ServicesContentProps) {
  const [services, setServices] = useState<Array<{
    title: string;
    description: string;
    price?: string;
  }>>(initialData?.services || []);

  const handleAddService = () => {
    setServices(prev => [...prev, { title: '', description: '', price: '' }]);
  };

  const handleRemoveService = (index: number) => {
    setServices(prev => prev.filter((_, i) => i !== index));
  };

  const handleServiceChange = (index: number, field: string, value: string) => {
    setServices(prev => prev.map((service, i) => 
      i === index ? { ...service, [field]: value } : service
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ services });
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <button
        onClick={onBack}
        className="mb-6 flex items-center text-blue-600 hover:text-blue-700"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Voltar para seleção de páginas
      </button>

      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Seus Serviços</h2>
        <p className="mt-2 text-gray-600">
          Adicione os serviços que você oferece
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {services.map((service, index) => (
          <div key={index} className="relative p-4 border rounded-lg">
            <button
              type="button"
              onClick={() => handleRemoveService(index)}
              className="absolute top-2 right-2 p-1 text-red-500 hover:text-red-600"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome do Serviço
                </label>
                <input
                  type="text"
                  required
                  value={service.title}
                  onChange={(e) => handleServiceChange(index, 'title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descrição
                </label>
                <textarea
                  required
                  rows={3}
                  value={service.description}
                  onChange={(e) => handleServiceChange(index, 'description', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preço (opcional)
                </label>
                <input
                  type="text"
                  value={service.price}
                  onChange={(e) => handleServiceChange(index, 'price', e.target.value)}
                  placeholder="Ex: R$ 100,00 ou A partir de R$ 100,00"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={handleAddService}
          className="w-full py-2 px-4 border-2 border-dashed border-gray-300 rounded-md text-gray-600 hover:border-gray-400 hover:text-gray-700 flex items-center justify-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Serviço
        </button>

        <button
          type="submit"
          disabled={services.length === 0}
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Salvar Serviços
        </button>
      </form>
    </div>
  );
}