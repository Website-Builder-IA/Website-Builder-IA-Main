import React, { useState, useEffect } from 'react';
import { AtSign, Phone, MapPin } from 'lucide-react';
import { validatePhone, validateEmail } from '../../utils/validation';
import { PhoneInput } from '../ui/PhoneInput';
import { EmailInput } from '../ui/EmailInput';

interface ContactInfoStepProps {
  onNext: (data: any) => void;
  onBack: () => void;
  data?: any;
}

export function ContactInfoStep({ onNext, onBack, data }: ContactInfoStepProps) {
  const [contactInfo, setContactInfo] = useState({
    email: data?.contact?.email || '',
    phone: data?.contact?.phone || '',
    address: data?.contact?.address || '',
    location: data?.contact?.location || null,
    social: {
      facebook: data?.contact?.social?.facebook || '',
      instagram: data?.contact?.social?.instagram || '',
      twitter: data?.contact?.social?.twitter || '',
    },
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [mapInitialized, setMapInitialized] = useState(false);

  useEffect(() => {
    // Load OpenStreetMap scripts
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.js';
    script.async = true;
    document.body.appendChild(script);

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.css';
    document.head.appendChild(link);

    script.onload = () => {
      initializeMap();
    };

    return () => {
      document.body.removeChild(script);
      document.head.removeChild(link);
    };
  }, []);

  const initializeMap = () => {
    if (!mapInitialized && window.L) {
      const mapElement = document.getElementById('map');
      if (mapElement) {
        const map = L.map('map').setView([-23.5505, -46.6333], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        // Add search control
        const searchInput = document.getElementById('address-input') as HTMLInputElement;
        searchInput.addEventListener('change', async () => {
          const address = searchInput.value;
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
            );
            const data = await response.json();
            if (data && data[0]) {
              const { lat, lon } = data[0];
              map.setView([lat, lon], 16);
              L.marker([lat, lon]).addTo(map);
              setContactInfo(prev => ({
                ...prev,
                location: { lat, lng: lon }
              }));
            }
          } catch (error) {
            console.error('Error searching address:', error);
          }
        });

        setMapInitialized(true);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    
    if (!validateEmail(contactInfo.email)) {
      newErrors.email = 'Email inválido';
    }
    
    if (!validatePhone(contactInfo.phone)) {
      newErrors.phone = 'Telefone inválido';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onNext({ contact: contactInfo });
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="text-center mb-8">
        <AtSign className="w-12 h-12 mx-auto text-blue-600 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900">Informações de Contato</h2>
        <p className="mt-2 text-gray-600">Como seus clientes podem te encontrar?</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <EmailInput
            value={contactInfo.email}
            onChange={(value) => setContactInfo(prev => ({ ...prev, email: value }))}
            required
            error={errors.email}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Telefone
          </label>
          <PhoneInput
            value={contactInfo.phone}
            onChange={(value) => setContactInfo(prev => ({ ...prev, phone: value }))}
            required
            error={errors.phone}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Endereço
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="address-input"
              type="text"
              required
              className="block w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-1 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Digite seu endereço"
              value={contactInfo.address}
              onChange={(e) => setContactInfo(prev => ({ ...prev, address: e.target.value }))}
            />
          </div>
          <div id="map" className="w-full h-64 mt-4 rounded-lg"></div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Redes Sociais (Opcional)</h3>
          <div className="grid grid-cols-1 gap-4">
            {['facebook', 'instagram', 'twitter'].map((platform) => (
              <div key={platform}>
                <label className="block text-sm font-medium text-gray-700 capitalize">
                  {platform}
                </label>
                <input
                  type="url"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder={`https://${platform}.com/seuperfil`}
                  value={contactInfo.social[platform as keyof typeof contactInfo.social]}
                  onChange={(e) =>
                    setContactInfo({
                      ...contactInfo,
                      social: {
                        ...contactInfo.social,
                        [platform]: e.target.value,
                      },
                    })
                  }
                />
              </div>
            ))}
          </div>
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