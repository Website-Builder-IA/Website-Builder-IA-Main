import React, { useState } from 'react';
import { formatPhone, validatePhone } from '../../utils/validation';

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  className?: string;
  error?: string;
}

export function PhoneInput({
  value,
  onChange,
  required = false,
  className = '',
  error
}: PhoneInputProps) {
  const [touched, setTouched] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (newValue === '') {
      onChange('');
      return;
    }

    // Only allow numbers and some special characters
    if (!/^[0-9() -]*$/.test(newValue)) {
      return;
    }

    const formatted = formatPhone(newValue);
    onChange(formatted);
  };

  const handleBlur = () => {
    setTouched(true);
  };

  const isValid = !value || validatePhone(value);
  const showError = touched && !isValid;

  return (
    <div>
      <input
        type="tel"
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        required={required}
        placeholder="(11) 99999-9999"
        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 ${
          showError || error
            ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
            : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
        } ${className}`}
      />
      {(showError || error) && (
        <p className="mt-1 text-sm text-red-600">
          {error || 'Por favor, insira um número de telefone válido'}
        </p>
      )}
    </div>
  );
}