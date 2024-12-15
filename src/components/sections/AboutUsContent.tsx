import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

interface AboutUsContentProps {
  onSave: (content: any) => void;
  onBack: () => void;
  initialData?: any;
}

export function AboutUsContent({ onSave, onBack, initialData }: AboutUsContentProps) {
  const [content, setContent] = useState({
    history: initialData?.history || '',
    mission: initialData?.mission || '',
    vision: initialData?.vision || '',
    values: initialData?.values || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(content);
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
        <h2 className="text-2xl font-bold text-gray-900">Sobre Sua Empresa</h2>
        <p className="mt-2 text-gray-600">
          Conte sua história e compartilhe seus valores
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            História da Empresa
          </label>
          <textarea
            required
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Conte como tudo começou..."
            value={content.history}
            onChange={(e) => setContent({ ...content, history: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nossa Missão
          </label>
          <textarea
            required
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Qual é a missão da sua empresa?"
            value={content.mission}
            onChange={(e) => setContent({ ...content, mission: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nossa Visão
          </label>
          <textarea
            required
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Onde você quer chegar?"
            value={content.vision}
            onChange={(e) => setContent({ ...content, vision: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nossos Valores
          </label>
          <textarea
            required
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Quais são os valores que guiam sua empresa?"
            value={content.values}
            onChange={(e) => setContent({ ...content, values: e.target.value })}
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Salvar Conteúdo
        </button>
      </form>
    </div>
  );
}