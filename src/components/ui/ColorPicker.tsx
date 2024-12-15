import React from 'react';

interface ColorPickerProps {
  colors: Record<string, string>;
  onChange: (key: string, value: string) => void;
  labels: Record<string, string>;
}

export function ColorPicker({ colors, onChange, labels }: ColorPickerProps) {
  return (
    <div className="space-y-4">
      {Object.entries(colors).map(([key, value]) => (
        <div key={key} className="flex items-center space-x-4">
          <label className="w-24 text-sm font-medium text-gray-700">
            {labels[key] || key}:
          </label>
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(key, e.target.value)}
            className="h-8 w-24"
          />
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(key, e.target.value)}
            className="flex-1 rounded-md border border-gray-300 px-3 py-1"
          />
        </div>
      ))}
    </div>
  );
}