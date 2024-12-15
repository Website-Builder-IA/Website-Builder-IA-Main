import React from 'react';
import { MessageSquare, Mail, ArrowRight, Star, Shield, Clock } from 'lucide-react';

interface CtaSectionProps {
  onWhatsAppClick: () => void;
  onEmailClick: () => void;
}

export function CtaSection({ onWhatsAppClick, onEmailClick }: CtaSectionProps) {
  return (
    <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16 px-8 rounded-lg shadow-xl mt-12">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Transforme sua Presença Digital Hoje Mesmo!
        </h2>
        
        <p className="text-xl mb-12 text-blue-100">
          Não perca mais tempo e oportunidades. Seu site profissional está a apenas um clique de distância!
        </p>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="flex flex-col items-center">
            <div className="bg-white/10 p-4 rounded-full mb-4">
              <Star className="w-8 h-8" />
            </div>
            <h3 className="font-semibold mb-2">Qualidade Premium</h3>
            <p className="text-blue-100">Design profissional que impressiona</p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="bg-white/10 p-4 rounded-full mb-4">
              <Shield className="w-8 h-8" />
            </div>
            <h3 className="font-semibold mb-2">100% Seguro</h3>
            <p className="text-blue-100">Tecnologia confiável e moderna</p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="bg-white/10 p-4 rounded-full mb-4">
              <Clock className="w-8 h-8" />
            </div>
            <h3 className="font-semibold mb-2">Rápido e Eficiente</h3>
            <p className="text-blue-100">Site pronto em minutos</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-center gap-6">
          <button
            onClick={onWhatsAppClick}
            className="flex items-center justify-center px-8 py-4 bg-green-500 hover:bg-green-600 rounded-lg text-lg font-semibold transition-all transform hover:scale-105"
          >
            <MessageSquare className="w-6 h-6 mr-2" />
            Falar com Especialista
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
          
          <button
            onClick={onEmailClick}
            className="flex items-center justify-center px-8 py-4 bg-white text-blue-600 hover:bg-blue-50 rounded-lg text-lg font-semibold transition-all transform hover:scale-105"
          >
            <Mail className="w-6 h-6 mr-2" />
            Solicitar Proposta
          </button>
        </div>

        <p className="mt-8 text-sm text-blue-100">
          Junte-se a milhares de empresas que já transformaram seus negócios com nossa solução
        </p>
      </div>
    </div>
  );
}