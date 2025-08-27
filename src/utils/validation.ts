interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export const validateBrazilianPhone = (phone: string): ValidationResult => {
  const cleanPhone = phone.replace(/\D/g, '');
  
  if (cleanPhone.length !== 11) {
    return {
      isValid: false,
      error: 'Número deve ter 11 dígitos (incluindo DDD)'
    };
  }

  if (!cleanPhone.startsWith('11') && !cleanPhone.startsWith('21') && 
      !cleanPhone.startsWith('31') && !cleanPhone.startsWith('41') &&
      !cleanPhone.startsWith('51') && !cleanPhone.startsWith('61') &&
      !cleanPhone.startsWith('71') && !cleanPhone.startsWith('81') &&
      !cleanPhone.startsWith('85')) {
    return {
      isValid: false,
      error: 'DDD inválido'
    };
  }

  if (!['9'].includes(cleanPhone[2])) {
    return {
      isValid: false,
      error: 'Número de celular deve começar com 9'
    };
  }

  return { isValid: true };
};

export const validateBrazilianName = (name: string): ValidationResult => {
  const trimmedName = name.trim();
  
  if (trimmedName.length < 2) {
    return {
      isValid: false,
      error: 'Nome deve ter pelo menos 2 caracteres'
    };
  }

  if (trimmedName.length > 100) {
    return {
      isValid: false,
      error: 'Nome muito longo'
    };
  }

  const nameRegex = /^[a-zA-ZÀ-ÿ\u00C0-\u017F\s'-]+$/;
  if (!nameRegex.test(trimmedName)) {
    return {
      isValid: false,
      error: 'Nome contém caracteres inválidos'
    };
  }

  const words = trimmedName.split(' ').filter(word => word.length > 0);
  if (words.length < 2) {
    return {
      isValid: false,
      error: 'Digite nome e sobrenome'
    };
  }

  return { isValid: true };
};

export const validateEmail = (email: string): ValidationResult => {
  const trimmedEmail = email.trim();
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmedEmail)) {
    return {
      isValid: false,
      error: 'Email inválido'
    };
  }

  if (trimmedEmail.length > 254) {
    return {
      isValid: false,
      error: 'Email muito longo'
    };
  }

  return { isValid: true };
};

export const formatBrazilianPhone = (phone: string): string => {
  const cleanPhone = phone.replace(/\D/g, '');
  
  if (cleanPhone.length === 11) {
    return `(${cleanPhone.slice(0, 2)}) ${cleanPhone.slice(2, 7)}-${cleanPhone.slice(7)}`;
  }
  
  return phone;
};
