import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stepper } from '../components/Stepper';
import { BusinessInfoStep } from '../components/steps/BusinessInfoStep';
import { ColorPaletteStep } from '../components/steps/ColorPaletteStep';
import { PagesStep } from '../components/steps/PagesStep';
import { ContactInfoStep } from '../components/steps/ContactInfoStep';
import { WebsitePreview } from '../components/WebsitePreview';
import { Home, RefreshCw } from 'lucide-react';

const steps = ['Informações do Negócio', 'Cores', 'Páginas', 'Contato'];

export function WebsiteBuilder() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<any>({});
  const [showPreview, setShowPreview] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    // Scroll to top when step changes
    window.scrollTo(0, 0);
  }, [currentStep]);

  const handleNext = (data: any) => {
    const newFormData = { ...formData, ...data };
    setFormData(newFormData);

    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setIsGenerating(true);
      // Simulate generation delay
      setTimeout(() => {
        setIsGenerating(false);
        setShowPreview(true);
      }, 2000);
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(0, prev - 1));
  };

  const handleRestart = () => {
    setFormData({});
    setCurrentStep(0);
    setShowPreview(false);
  };

  const handleReturnHome = () => {
    navigate('/');
  };

  if (isGenerating) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Gerando seu site...</h2>
          <p className="text-gray-600">Estamos criando algo incrível para você!</p>
        </div>
      </div>
    );
  }

  if (showPreview) {
    return (
      <div>
        <header className="bg-white shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <button
                onClick={handleReturnHome}
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <Home className="h-5 w-5 mr-2" />
                Voltar ao Início
              </button>
              <button
                onClick={handleRestart}
                className="flex items-center text-blue-600 hover:text-blue-700"
              >
                <RefreshCw className="h-5 w-5 mr-2" />
                Recomeçar
              </button>
            </div>
          </div>
        </header>
        <WebsitePreview data={formData} />
      </div>
    );
  }

  const StepComponent = [
    BusinessInfoStep,
    ColorPaletteStep,
    PagesStep,
    ContactInfoStep,
  ][currentStep];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-xl font-bold text-gray-900">
            Criador de Sites Profissionais
          </h1>
          <div className="mt-4">
            <Stepper steps={steps} currentStep={currentStep} />
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <StepComponent
              onNext={handleNext}
              onBack={handleBack}
              data={formData}
            />
          </div>
        </div>
      </main>
    </div>
  );
}