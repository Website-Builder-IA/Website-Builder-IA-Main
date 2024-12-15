import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HeroSection } from '../components/landing/HeroSection';
import { HowItWorksSection } from '../components/landing/HowItWorksSection';
import { TestimonialsSection } from '../components/landing/TestimonialsSection';
import { ScalabilitySection } from '../components/landing/ScalabilitySection';
import { Footer } from '../components/landing/Footer';
import { Rocket } from 'lucide-react';

export function LandingPage() {
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleGetStarted = () => {
    navigate('/builder');
  };

  const navItems = [
    { id: 'how-it-works', label: 'Como Funciona' },
    { id: 'features', label: 'Recursos' },
    { id: 'testimonials', label: 'Depoimentos' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Rocket className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                SiteBuilder AI
              </span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-gray-600 hover:text-gray-900"
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={handleGetStarted}
                className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
              >
                Criar Meu Site
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main>
        <HeroSection />
        <div id="how-it-works">
          <HowItWorksSection />
        </div>
        <div id="features">
          <ScalabilitySection />
        </div>
        <div id="testimonials">
          <TestimonialsSection />
        </div>
      </main>

      <Footer />
    </div>
  );
}