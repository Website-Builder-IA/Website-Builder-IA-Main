import React from 'react';
import { TrendingUp, Users, Globe, Zap } from 'lucide-react';

const benefits = [
  {
    icon: TrendingUp,
    title: 'Crescimento Acelerado',
    description: 'Aumente sua presença online e alcance mais clientes com um site profissional e otimizado.'
  },
  {
    icon: Users,
    title: 'Experiência do Cliente',
    description: 'Ofereça uma experiência excepcional com um site responsivo e de fácil navegação.'
  },
  {
    icon: Globe,
    title: 'Alcance Global',
    description: 'Expanda seus horizontes e alcance clientes em qualquer lugar do mundo.'
  },
  {
    icon: Zap,
    title: 'Automação Inteligente',
    description: 'Automatize processos e ganhe eficiência com ferramentas integradas de gestão.'
  }
];

export function ScalabilitySection() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Escale seu negócio com SiteBuilder AI
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Transforme sua presença online e impulsione seu crescimento com nossa plataforma
            inteligente de criação de sites
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="relative bg-white rounded-lg shadow-lg p-8 transform transition-all hover:scale-105"
            >
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                    <benefit.icon className="h-6 w-6" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    {benefit.title}
                  </h3>
                  <p className="mt-2 text-gray-600">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a
            href="#pricing"
            className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            Comece a escalar agora
          </a>
        </div>
      </div>
    </section>
  );
}