import { useState } from 'react';
import { colorPalettes } from '../utils/constants';

export function useColorPalette(initialPalette: string | undefined, onSubmit: (palette: string) => void) {
  const [selected, setSelected] = useState(initialPalette || '');
  const [isCustom, setIsCustom] = useState(false);
  const [customColors, setCustomColors] = useState({
    primary: '#000000',
    secondary: '#333333',
    accent: '#666666',
    background: '#ffffff',
    text: '#000000',
  });

  const handlePaletteSelect = (paletteName: string) => {
    if (paletteName === 'custom') {
      setIsCustom(true);
      setSelected('Personalizado');
    } else {
      setIsCustom(false);
      setSelected(paletteName);
    }
  };

  const handleCustomColorChange = (key: string, value: string) => {
    setCustomColors(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isCustom) {
      // Update the custom palette in the colorPalettes array
      const customPalette = colorPalettes.find(p => p.name === 'Personalizado');
      if (customPalette) {
        Object.assign(customPalette, customColors);
      }
      onSubmit('Personalizado');
    } else {
      onSubmit(selected);
    }
  };

  return {
    selected,
    isCustom,
    customColors,
    handlePaletteSelect,
    handleCustomColorChange,
    handleSubmit,
  };
}