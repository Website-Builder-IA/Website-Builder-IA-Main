import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export function HeroSection() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/builder');
  };

  const handleLearnMore = () => {
    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="z-10">
            <h1 className="text-4xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
              Crie sites profissionais com{' '}
              <span className="text-blue-600">Inteligência Artificial</span>
            </h1>
            <p className="mt-6 text-xl text-gray-600">
              Transforme sua presença online em minutos. Nossa IA cria sites
              personalizados e profissionais para seu negócio, sem necessidade de
              conhecimentos técnicos.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleGetStarted}
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                Comece Agora
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button
                onClick={handleLearnMore}
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                Saiba Mais
              </button>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                { number: '1000+', label: 'Sites Criados' },
                { number: '98%', label: 'Clientes Satisfeitos' },
                { number: '24/7', label: 'Suporte' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-bold text-blue-600">{stat.number}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute top-0 right-0 w-1/2 h-full lg:block hidden">
            <img
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426&ixlib=rb-4.0.3"
              alt="Dashboard"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}