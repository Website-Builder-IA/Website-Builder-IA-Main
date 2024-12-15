import React, { useState } from 'react';
import { Layout, Check } from 'lucide-react';
import { AboutUsContent } from '../sections/AboutUsContent';
import { ServicesContent } from '../sections/ServicesContent';
import { GalleryContent } from '../sections/GalleryContent';
import { ProductsContent } from '../sections/ProductsContent';
import { BlogContent } from '../sections/BlogContent';
import { SectionStatus } from '../ui/SectionStatus';

const availablePages = [
  {
    id: 'home',
    name: 'Início',
    description: 'Página principal',
    required: true,
  },
  {
    id: 'about',
    name: 'Sobre Nós',
    description: 'Compartilhe sua história e missão',
    required: false,
  },
  {
    id: 'services',
    name: 'Serviços',
    description: 'Liste seus serviços',
    required: false,
  },
  {
    id: 'products',
    name: 'Produtos',
    description: 'Mostre seus produtos',
    required: false,
  },
  {
    id: 'gallery',
    name: 'Galeria',
    description: 'Exiba fotos e portfólio',
    required: false,
  },
  {
    id: 'blog',
    name: 'Blog',
    description: 'Compartilhe atualizações e artigos',
    required: false,
  },
  {
    id: 'contact',
    name: 'Contato',
    description: 'Ajude clientes a te encontrarem',
    required: true,
  },
];

interface PagesStepProps {
  onNext: (data: any) => void;
  onBack: () => void;
  data?: any;
}

export function PagesStep({ onNext, onBack, data }: PagesStepProps) {
  const [selectedPages, setSelectedPages] = useState<string[]>(
    data?.pages || ['home', 'contact']
  );
  const [currentSection, setCurrentSection] = useState<string | null>(null);
  const [sectionsContent, setSectionsContent] = useState<Record<string, any>>(
    data?.sectionsContent || {}
  );
  const [errors, setErrors] = useState<string[]>([]);

  const handleTogglePage = (pageId: string) => {
    if (availablePages.find((p) => p.id === pageId)?.required) return;

    setSelectedPages((current) =>
      current.includes(pageId)
        ? current.filter((id) => id !== pageId)
        : [...current, pageId]
    );
  };

  const handleSectionSave = (content: any) => {
    if (currentSection) {
      setSectionsContent(prev => ({
        ...prev,
        [currentSection]: content
      }));
      setCurrentSection(null);
      setErrors(prev => prev.filter(error => !error.includes(currentSection)));
    }
  };

  const validateSections = () => {
    const newErrors: string[] = [];
    selectedPages.forEach(page => {
      if (!['home', 'contact'].includes(page) && !sectionsContent[page]) {
        const pageName = availablePages.find(p => p.id === page)?.name;
        newErrors.push(`Adicione conteúdo para a seção "${pageName}"`);
      }
    });
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateSections()) {
      return;
    }

    onNext({ 
      pages: selectedPages,
      sectionsContent
    });
  };

  const renderSectionContent = () => {
    switch (currentSection) {
      case 'about':
        return (
          <AboutUsContent
            onSave={handleSectionSave}
            onBack={() => setCurrentSection(null)}
            initialData={sectionsContent.about}
          />
        );
      case 'services':
        return (
          <ServicesContent
            onSave={handleSectionSave}
            onBack={() => setCurrentSection(null)}
            initialData={sectionsContent.services}
          />
        );
      case 'products':
        return (
          <ProductsContent
            onSave={handleSectionSave}
            onBack={() => setCurrentSection(null)}
            initialData={sectionsContent.products}
          />
        );
      case 'gallery':
        return (
          <GalleryContent
            onSave={handleSectionSave}
            onBack={() => setCurrentSection(null)}
            initialData={sectionsContent.gallery}
          />
        );
      case 'blog':
        return (
          <BlogContent
            onSave={handleSectionSave}
            onBack={() => setCurrentSection(null)}
            initialData={sectionsContent.blog}
          />
        );
      default:
        return null;
    }
  };

  if (currentSection) {
    return renderSectionContent();
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="text-center mb-8">
        <Layout className="w-12 h-12 mx-auto text-blue-600 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900">Escolha Suas Páginas</h2>
        <p className="mt-2 text-gray-600">Selecione as páginas que deseja em seu site</p>
      </div>

      {errors.length > 0 && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <h3 className="text-red-800 font-medium mb-2">Por favor, corrija os seguintes erros:</h3>
          <ul className="list-disc list-inside text-red-600">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-4">
          {availablePages.map((page) => (
            <div
              key={page.id}
              onClick={() => handleTogglePage(page.id)}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                selectedPages.includes(page.id)
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              } ${page.required ? 'opacity-75 cursor-not-allowed' : ''}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">
                    {page.name}
                    {page.required && (
                      <span className="ml-2 text-xs text-gray-500">(Obrigatório)</span>
                    )}
                  </h3>
                  <p className="text-sm text-gray-500">{page.description}</p>
                  {selectedPages.includes(page.id) && !['home', 'contact'].includes(page.id) && (
                    <div className="mt-2 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentSection(page.id);
                        }}
                        className="text-sm text-blue-600 hover:text-blue-700"
                      >
                        {sectionsContent[page.id] ? 'Editar Conteúdo' : 'Adicionar Conteúdo'}
                      </button>
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-4">
                  {selectedPages.includes(page.id) && !['home', 'contact'].includes(page.id) && (
                    <SectionStatus hasContent={!!sectionsContent[page.id]} />
                  )}
                  {selectedPages.includes(page.id) && (
                    <Check className="w-5 h-5 text-blue-600" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex space-x-4">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Voltar
          </button>
          <button
            type="submit"
            className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Continuar
          </button>
        </div>
      </form>
    </div>
  );
}