import React from 'react';
import { Palette } from 'lucide-react';
import { colorPalettes } from '../../constants';

export function ColorPaletteStep({ onNext, onBack, data }: any) {
  const [selected, setSelected] = React.useState(data?.colorPalette || '');
  const [isCustom, setIsCustom] = React.useState(false);
  const [customColors, setCustomColors] = React.useState({
    primary: '#000000',
    secondary: '#333333',
    accent: '#666666',
    background: '#ffffff',
    text: '#000000',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isCustom) {
      const customPalette = colorPalettes.find(p => p.name === 'Personalizado');
      if (customPalette) {
        Object.assign(customPalette, customColors);
      }
      onNext({ colorPalette: 'Personalizado' });
    } else {
      onNext({ colorPalette: selected });
    }
  };

  // Filter out the custom palette and split the remaining into two columns
  const standardPalettes = colorPalettes.filter(p => p.name !== 'Personalizado');
  const midPoint = Math.ceil(standardPalettes.length / 2);
  const leftColumnPalettes = standardPalettes.slice(0, midPoint);
  const rightColumnPalettes = standardPalettes.slice(midPoint);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="text-center mb-8">
        <Palette className="w-12 h-12 mx-auto text-blue-600 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900">Escolha sua paleta de cores</h2>
        <p className="mt-2 text-gray-600">Selecione um estilo que combine com sua marca</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          {/* Left Column */}
          <div className="space-y-4">
            {leftColumnPalettes.map((palette) => (
              <button
                key={palette.name}
                type="button"
                onClick={() => {
                  setSelected(palette.name);
                  setIsCustom(false);
                }}
                className={`w-full p-4 rounded-lg border-2 transition-all ${
                  selected === palette.name && !isCustom
                    ? 'border-blue-500 ring-2 ring-blue-200'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex flex-col space-y-2">
                  <span className="font-medium">{palette.name}</span>
                  <div className="flex space-x-2">
                    <div className="w-6 h-6 rounded-full" style={{ backgroundColor: palette.primary }} />
                    <div className="w-6 h-6 rounded-full" style={{ backgroundColor: palette.secondary }} />
                    <div className="w-6 h-6 rounded-full" style={{ backgroundColor: palette.accent }} />
                    <div className="w-6 h-6 rounded-full" style={{ backgroundColor: palette.text }} />
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {rightColumnPalettes.map((palette) => (
              <button
                key={palette.name}
                type="button"
                onClick={() => {
                  setSelected(palette.name);
                  setIsCustom(false);
                }}
                className={`w-full p-4 rounded-lg border-2 transition-all ${
                  selected === palette.name && !isCustom
                    ? 'border-blue-500 ring-2 ring-blue-200'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex flex-col space-y-2">
                  <span className="font-medium">{palette.name}</span>
                  <div className="flex space-x-2">
                    <div className="w-6 h-6 rounded-full" style={{ backgroundColor: palette.primary }} />
                    <div className="w-6 h-6 rounded-full" style={{ backgroundColor: palette.secondary }} />
                    <div className="w-6 h-6 rounded-full" style={{ backgroundColor: palette.accent }} />
                    <div className="w-6 h-6 rounded-full" style={{ backgroundColor: palette.text }} />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <button
            type="button"
            onClick={() => {
              setIsCustom(true);
              setSelected('');
            }}
            className={`w-full p-4 rounded-lg border-2 transition-all ${
              isCustom
                ? 'border-blue-500 ring-2 ring-blue-200'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            Criar Paleta Personalizada
          </button>

          {isCustom && (
            <div className="mt-4 space-y-4">
              {Object.entries(customColors).map(([key, value]) => (
                <div key={key} className="flex items-center space-x-4">
                  <label className="w-24 text-sm font-medium text-gray-700 capitalize">
                    {key === 'primary' ? 'Principal' :
                     key === 'secondary' ? 'Secundária' :
                     key === 'accent' ? 'Destaque' :
                     key === 'background' ? 'Fundo' :
                     'Texto'}:
                  </label>
                  <input
                    type="color"
                    value={value}
                    onChange={(e) =>
                      setCustomColors(prev => ({
                        ...prev,
                        [key]: e.target.value,
                      }))
                    }
                    className="h-8 w-24"
                  />
                  <input
                    type="text"
                    value={value}
                    onChange={(e) =>
                      setCustomColors(prev => ({
                        ...prev,
                        [key]: e.target.value,
                      }))
                    }
                    className="flex-1 rounded-md border border-gray-300 px-3 py-1"
                  />
                </div>
              ))}
            </div>
          )}
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
            disabled={!selected && !isCustom}
            className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continuar
          </button>
        </div>
      </form>
    </div>
  );
}