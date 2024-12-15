import React, { useState } from 'react';
import { validateEmail } from '../../utils/validation';

interface EmailInputProps {
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  className?: string;
  error?: string;
}

export function EmailInput({
  value,
  onChange,
  required = false,
  className = '',
  error
}: EmailInputProps) {
  const [touched, setTouched] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleBlur = () => {
    setTouched(true);
  };

  const isValid = !value || validateEmail(value);
  const showError = touched && !isValid;

  return (
    <div>
      <input
        type="email"
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        required={required}
        placeholder="exemplo@email.com"
        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 ${
          showError || error
            ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
            : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
        } ${className}`}
      />
      {(showError || error) && (
        <p className="mt-1 text-sm text-red-600">
          {error || 'Por favor, insira um email válido'}
        </p>
      )}
    </div>
  );
}