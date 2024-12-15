import React, { useState } from 'react';
import { BusinessInfo } from '../types';
import { colorPalettes } from '../constants';
import { getBusinessHeroImage } from '../utils/businessImages';
import { CtaSection } from './ui/CtaSection';
import { Maximize2, MapPin, Phone, Mail, Clock, ArrowRight } from 'lucide-react';

interface WebsitePreviewProps {
  data: BusinessInfo;
}

export function WebsitePreview({ data }: WebsitePreviewProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const selectedPalette = colorPalettes.find(p => p.name === data.colorPalette) || colorPalettes[0];

  const handleWhatsAppClick = () => {
    const phone = data.contact?.phone?.replace(/\D/g, '') || '';
    const message = encodeURIComponent('Olá! Vi o site gerado e gostaria de mais informações.');
    window.open(`https://wa.me/55${phone}?text=${message}`, '_blank');
  };

  const handleEmailClick = () => {
    const email = data.contact?.email || '';
    const subject = encodeURIComponent('Interesse no site gerado');
    const body = encodeURIComponent('Olá! Vi o site gerado e gostaria de mais informações.');
    window.open(`mailto:${email}?subject=${subject}&body=${body}`, '_blank');
  };

  const renderAboutSection = () => {
    if (!data.sectionsContent?.about) return null;
    const { history, mission, vision, values } = data.sectionsContent.about;

    return (
      <section className="py-16 px-8" style={{ backgroundColor: selectedPalette.background }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: selectedPalette.primary }}>
            Sobre Nós
          </h2>
          <div className="space-y-8">
            <div className="prose max-w-none">
              <p className="text-lg" style={{ color: selectedPalette.text }}>{history}</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 rounded-lg bg-white shadow-md">
                <h3 className="text-xl font-semibold mb-3" style={{ color: selectedPalette.secondary }}>
                  Nossa Missão
                </h3>
                <p style={{ color: selectedPalette.text }}>{mission}</p>
              </div>
              <div className="p-6 rounded-lg bg-white shadow-md">
                <h3 className="text-xl font-semibold mb-3" style={{ color: selectedPalette.secondary }}>
                  Nossa Visão
                </h3>
                <p style={{ color: selectedPalette.text }}>{vision}</p>
              </div>
              <div className="p-6 rounded-lg bg-white shadow-md">
                <h3 className="text-xl font-semibold mb-3" style={{ color: selectedPalette.secondary }}>
                  Nossos Valores
                </h3>
                <p style={{ color: selectedPalette.text }}>{values}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  const renderServicesSection = () => {
    if (!data.sectionsContent?.services?.services?.length) return null;

    return (
      <section className="py-16 px-8" style={{ backgroundColor: 'white' }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: selectedPalette.primary }}>
            Nossos Serviços
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {data.sectionsContent.services.services.map((service, index) => (
              <div key={index} className="p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-3" style={{ color: selectedPalette.secondary }}>
                  {service.title}
                </h3>
                <p className="mb-4" style={{ color: selectedPalette.text }}>
                  {service.description}
                </p>
                {service.price && (
                  <p className="font-semibold" style={{ color: selectedPalette.accent }}>
                    {service.price}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  const renderProductsSection = () => {
    if (!data.sectionsContent?.products?.products?.length) return null;

    return (
      <section className="py-16 px-8" style={{ backgroundColor: selectedPalette.background }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: selectedPalette.primary }}>
            Nossos Produtos
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {data.sectionsContent.products.products.map((product, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                {product.image && (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2" style={{ color: selectedPalette.secondary }}>
                    {product.name}
                  </h3>
                  <p className="text-sm mb-3" style={{ color: selectedPalette.text }}>
                    {product.description}
                  </p>
                  <p className="font-bold" style={{ color: selectedPalette.accent }}>
                    {product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  const renderGallerySection = () => {
    if (!data.sectionsContent?.gallery?.images?.length) return null;

    return (
      <section className="py-16 px-8" style={{ backgroundColor: 'white' }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: selectedPalette.primary }}>
            Galeria
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {data.sectionsContent.gallery.images.map((image, index) => (
              <div key={index} className="relative group">
                <img
                  src={image.url}
                  alt={image.caption}
                  className="w-full h-64 object-cover rounded-lg"
                />
                {image.caption && (
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                    <p className="text-white text-center px-4">{image.caption}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  const renderBlogSection = () => {
    if (!data.sectionsContent?.blog?.posts?.length) return null;

    return (
      <section className="py-16 px-8" style={{ backgroundColor: selectedPalette.background }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: selectedPalette.primary }}>
            Blog
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {data.sectionsContent.blog.posts.map((post, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-3" style={{ color: selectedPalette.secondary }}>
                  {post.title}
                </h3>
                <p className="mb-4 text-gray-600">{post.excerpt}</p>
                <button
                  className="inline-flex items-center text-sm font-medium transition-colors"
                  style={{ color: selectedPalette.primary }}
                >
                  Ler mais
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  const renderContactSection = () => {
    return (
      <section className="py-16 px-8" style={{ backgroundColor: 'white' }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: selectedPalette.primary }}>
            Contato
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-center">
                <Phone className="w-6 h-6 mr-4" style={{ color: selectedPalette.accent }} />
                <div>
                  <h3 className="font-semibold" style={{ color: selectedPalette.secondary }}>Telefone</h3>
                  <p>{data.contact?.phone}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Mail className="w-6 h-6 mr-4" style={{ color: selectedPalette.accent }} />
                <div>
                  <h3 className="font-semibold" style={{ color: selectedPalette.secondary }}>Email</h3>
                  <p>{data.contact?.email}</p>
                </div>
              </div>
              <div className="flex items-center">
                <MapPin className="w-6 h-6 mr-4" style={{ color: selectedPalette.accent }} />
                <div>
                  <h3 className="font-semibold" style={{ color: selectedPalette.secondary }}>Endereço</h3>
                  <p>{data.contact?.address}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Clock className="w-6 h-6 mr-4" style={{ color: selectedPalette.accent }} />
                <div>
                  <h3 className="font-semibold" style={{ color: selectedPalette.secondary }}>Horário de Funcionamento</h3>
                  <p>Segunda a Sexta: 9h às 18h</p>
                  <p>Sábado: 9h às 13h</p>
                </div>
              </div>
            </div>
            <div>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Seu Nome"
                  className="w-full px-4 py-2 rounded-lg border"
                />
                <input
                  type="email"
                  placeholder="Seu Email"
                  className="w-full px-4 py-2 rounded-lg border"
                />
                <textarea
                  placeholder="Sua Mensagem"
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border"
                />
                <button
                  type="submit"
                  className="w-full py-2 rounded-lg text-white font-medium"
                  style={{ backgroundColor: selectedPalette.primary }}
                >
                  Enviar Mensagem
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Seu site está pronto!</h2>
          <p className="text-gray-600">Veja como ficou seu site profissional</p>
        </div>

        <div className={`relative bg-white rounded-lg shadow-xl overflow-hidden transition-all duration-300 ${
          isFullscreen ? 'fixed inset-4 z-50 overflow-y-auto' : 'max-w-5xl mx-auto'
        }`}>
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="absolute top-4 right-4 p-2 bg-white/90 rounded-full shadow-lg z-10 hover:bg-white transition-colors"
          >
            <Maximize2 className="w-5 h-5" />
          </button>

          {/* Website Content */}
          <div className="w-full">
            {/* Hero Section */}
            <div className="relative">
              <img
                src={getBusinessHeroImage(data.type)}
                alt={data.name}
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30 flex flex-col items-center justify-center text-center px-4">
                <h1 className="text-5xl font-bold text-white mb-4">
                  {data.name}
                </h1>
                <p className="text-xl text-white/90 max-w-2xl">
                  {data.description}
                </p>
              </div>
            </div>

            {/* Dynamic Sections */}
            {renderAboutSection()}
            {renderServicesSection()}
            {renderProductsSection()}
            {renderGallerySection()}
            {renderBlogSection()}
            {renderContactSection()}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-8">
          <CtaSection
            onWhatsAppClick={handleWhatsAppClick}
            onEmailClick={handleEmailClick}
          />
        </div>
      </div>

      {isFullscreen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setIsFullscreen(false)}
        />
      )}
    </div>
  );
}