import React, { useState, useEffect } from 'react';
import { formatMoney } from '../../utils/validation';

interface MoneyInputProps {
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  placeholder?: string;
  className?: string;
}

export function MoneyInput({
  value,
  onChange,
  required = false,
  placeholder = 'R$ 0,00',
  className = '',
}: MoneyInputProps) {
  const [displayValue, setDisplayValue] = useState(value);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (!isFocused && value) {
      setDisplayValue(formatMoney(value));
    }
  }, [value, isFocused]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.replace(/[^\d]/g, '');
    const numericValue = newValue ? parseInt(newValue) / 100 : 0;
    setDisplayValue(formatMoney(String(numericValue)));
    onChange(String(numericValue));
  };

  const handleFocus = () => {
    setIsFocused(true);
    const numericValue = value.replace(/[^\d]/g, '');
    setDisplayValue(numericValue ? (parseInt(numericValue) / 100).toString() : '');
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (displayValue) {
      setDisplayValue(formatMoney(displayValue));
    }
  };

  return (
    <input
      type="text"
      value={displayValue}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      required={required}
      placeholder={placeholder}
      className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 border-gray-300 focus:ring-blue-500 focus:border-blue-500 ${className}`}
    />
  );
}