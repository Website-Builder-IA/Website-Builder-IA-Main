import React from 'react';
import { Check, Crown } from 'lucide-react';

const plans = [
  {
    name: 'Básico',
    price: '597',
    features: [
      'Até 5 páginas por site',
      'Templates básicos',
      'Suporte por email',
      'Domínio personalizado',
      'SSL gratuito',
      'Hospedagem incluída',
    ],
  },
  {
    name: 'Intermediário',
    price: '897',
    popular: true,
    features: [
      'Até 10 páginas por site',
      'Templates premium',
      'Suporte prioritário',
      'Domínio personalizado',
      'SSL gratuito',
      'Hospedagem incluída',
      'SEO otimizado',
      'Analytics básico',
    ],
  },
  {
    name: 'Pro',
    price: '1097',
    features: [
      'Páginas ilimitadas',
      'Templates exclusivos',
      'Suporte 24/7',
      'Domínio personalizado',
      'SSL gratuito',
      'Hospedagem incluída',
      'SEO avançado',
      'Analytics completo',
      'Integrações personalizadas',
      'Consultoria mensal',
    ],
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Planos e Preços
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Escolha o plano ideal para o seu negócio
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col h-full bg-white rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-105 ${
                plan.popular ? 'ring-2 ring-blue-500 scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 -mr-2 -mt-2 bg-blue-500 text-white px-4 py-1 rounded-bl-lg shadow-lg flex items-center">
                  <Crown className="w-4 h-4 mr-1" />
                  <span className="text-sm font-medium">Mais Popular</span>
                </div>
              )}
              <div className="p-8 flex-grow">
                <h3 className="text-2xl font-bold text-gray-900 text-center mb-4">
                  {plan.name}
                </h3>
                <div className="flex justify-center items-baseline mb-8">
                  <span className="text-5xl font-extrabold text-gray-900">
                    R${plan.price}
                  </span>
                </div>
                <ul className="space-y-4 flex-grow">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-8 bg-gray-50 border-t border-gray-100">
                <button 
                  className={`w-full py-3 px-6 rounded-md font-medium text-white transition-colors ${
                    plan.popular
                      ? 'bg-blue-600 hover:bg-blue-700 shadow-lg'
                      : 'bg-gray-600 hover:bg-gray-700'
                  }`}
                >
                  Começar Agora
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}