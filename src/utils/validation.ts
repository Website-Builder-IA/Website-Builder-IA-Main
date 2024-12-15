export const validatePhone = (phone: string): boolean => {
  // Regex for Brazilian phone numbers (accepts formats like: (11) 99999-9999 or 11999999999)
  const phoneRegex = /^(?:\(?([1-9][0-9])\)?\s?)?(?:9\d{4}[-\s]?\d{4}|\d{4}[-\s]?\d{4})$/;
  return phoneRegex.test(phone.replace(/\D/g, ''));
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const formatPhone = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 11) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
  }
  return phone;
};

export const formatMoney = (value: string): string => {
  // Remove all non-digit characters
  const cleaned = value.replace(/\D/g, '');
  
  // Convert to number and divide by 100 to get decimal places
  const number = parseInt(cleaned) / 100;
  
  // Format as Brazilian currency
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(number);
};

export const validateMoney = (value: string): boolean => {
  // Accept values like R$ 1.234,56 or 1234,56 or 1234.56
  const moneyRegex = /^R?\$?\s?(\d{1,3}(\.\d{3})*|\d+)(,\d{2})?$/;
  return moneyRegex.test(value.replace(/\s/g, ''));
};