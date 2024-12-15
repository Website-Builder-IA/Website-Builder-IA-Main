import React from 'react';
import { Lightbulb, Palette, Globe, Zap } from 'lucide-react';

const steps = [
  {
    icon: Lightbulb,
    title: 'Compartilhe sua visão',
    description: 'Conte-nos sobre seu negócio, objetivos e preferências de design.',
  },
  {
    icon: Palette,
    title: 'Personalize seu site',
    description: 'Escolha cores, layouts e elementos que combinam com sua marca.',
  },
  {
    icon: Globe,
    title: 'IA em ação',
    description: 'Nossa IA avançada gera um site profissional baseado nas suas escolhas.',
  },
  {
    icon: Zap,
    title: 'Site pronto',
    description: 'Receba um site otimizado e pronto para conquistar seus clientes.',
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Como Funciona
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Crie seu site profissional em minutos com nossa tecnologia de IA
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-1/2 w-full h-0.5 bg-gray-200" />
                )}
                <div className="relative flex flex-col items-center">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-100">
                    <step.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-gray-900">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-center text-gray-500">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <div className="relative">
            <iframe
              width="100%"
              height="500"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Video demonstrativo"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}