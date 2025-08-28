interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export const validateLatinAmericanPhone = (phone: string): ValidationResult => {
  const cleanPhone = phone.replace(/\D/g, '');
  
  // Проверка длины для разных стран
  if (cleanPhone.length < 10 || cleanPhone.length > 13) {
    return {
      isValid: false,
      error: 'Número deve ter entre 10 e 13 dígitos'
    };
  }

  // Коды стран Латинской Америки
  const latinAmericanCodes = {
    // Бразилия: 55 + DDD (2 цифры) + 9 цифр = 13 цифр
    '55': { name: 'Brasil', minLength: 13, maxLength: 13 },
    // Аргентина: 54 + код города + номер = 11-12 цифр  
    '54': { name: 'Argentina', minLength: 11, maxLength: 12 },
    // Мексика: 52 + 10 цифр = 12 цифр
    '52': { name: 'México', minLength: 12, maxLength: 12 },
    // Колумбия: 57 + 10 цифр = 12 цифр
    '57': { name: 'Colombia', minLength: 12, maxLength: 12 },
    // Чили: 56 + 9 цифр = 11 цифр
    '56': { name: 'Chile', minLength: 11, maxLength: 11 },
    // Перу: 51 + 9 цифр = 11 цифр
    '51': { name: 'Perú', minLength: 11, maxLength: 11 },
    // Венесуэла: 58 + 10 цифр = 12 цифр
    '58': { name: 'Venezuela', minLength: 12, maxLength: 12 },
    // Эквадор: 593 + 8-9 цифр = 11-12 цифр
    '593': { name: 'Ecuador', minLength: 11, maxLength: 12 },
    // Боливия: 591 + 8 цифр = 11 цифр
    '591': { name: 'Bolivia', minLength: 11, maxLength: 11 },
    // Парагвай: 595 + 9 цифр = 12 цифр
    '595': { name: 'Paraguay', minLength: 12, maxLength: 12 },
    // Уругвай: 598 + 8 цифр = 11 цифр
    '598': { name: 'Uruguay', minLength: 11, maxLength: 11 },
    // Коста-Рика: 506 + 8 цифр = 11 цифр
    '506': { name: 'Costa Rica', minLength: 11, maxLength: 11 },
    // Панама: 507 + 8 цифр = 11 цифр
    '507': { name: 'Panamá', minLength: 11, maxLength: 11 }
  };

  // Проверяем код страны
  let countryCode = '';
  let countryConfig = null;

  // Сначала проверяем 3-значные коды
  for (const code of ['593', '591', '595', '598', '506', '507']) {
    if (cleanPhone.startsWith(code)) {
      countryCode = code;
      countryConfig = latinAmericanCodes[code];
      break;
    }
  }

  // Потом 2-значные коды
  if (!countryCode) {
    for (const code of ['55', '54', '52', '57', '56', '51', '58']) {
      if (cleanPhone.startsWith(code)) {
        countryCode = code;
        countryConfig = latinAmericanCodes[code];
        break;
      }
    }
  }

  if (!countryCode || !countryConfig) {
    return {
      isValid: false,
      error: 'Código de país não suportado. Use: +55 (BR), +54 (AR), +52 (MX), +57 (CO), +56 (CL), +51 (PE)'
    };
  }

  // Проверяем длину для конкретной страны
  if (cleanPhone.length < countryConfig.minLength || cleanPhone.length > countryConfig.maxLength) {
    return {
      isValid: false,
      error: `Número inválido para ${countryConfig.name}. Deve ter ${countryConfig.minLength}${countryConfig.maxLength !== countryConfig.minLength ? `-${countryConfig.maxLength}` : ''} dígitos`
    };
  }

  // Специальная проверка для Бразилии (мобильные должны начинаться с 9)
  if (countryCode === '55') {
    const phonePart = cleanPhone.substring(2); // Убираем код страны
    if (phonePart.length === 11 && phonePart[2] !== '9') {
      return {
        isValid: false,
        error: 'Número móvel brasileiro deve começar com 9 após o DDD'
      };
    }
  }

  return { isValid: true };
};

// Оставляем старую функцию для совместимости
export const validateBrazilianPhone = validateLatinAmericanPhone;

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

export const formatLatinAmericanPhone = (phone: string): string => {
  const cleanPhone = phone.replace(/\D/g, '');
  
  // Бразилия: +55 (11) 99999-9999
  if (cleanPhone.startsWith('55') && cleanPhone.length === 13) {
    return `+${cleanPhone.slice(0, 2)} (${cleanPhone.slice(2, 4)}) ${cleanPhone.slice(4, 9)}-${cleanPhone.slice(9)}`;
  }
  
  // Аргентина: +54 9 11 9999-9999 или +54 11 9999-9999
  if (cleanPhone.startsWith('54')) {
    if (cleanPhone.length === 12) {
      return `+${cleanPhone.slice(0, 2)} ${cleanPhone.slice(2, 4)} ${cleanPhone.slice(4, 8)}-${cleanPhone.slice(8)}`;
    }
    if (cleanPhone.length === 11) {
      return `+${cleanPhone.slice(0, 2)} ${cleanPhone.slice(2, 3)} ${cleanPhone.slice(3, 5)} ${cleanPhone.slice(5, 9)}-${cleanPhone.slice(9)}`;
    }
  }
  
  // Мексика: +52 55 9999-9999
  if (cleanPhone.startsWith('52') && cleanPhone.length === 12) {
    return `+${cleanPhone.slice(0, 2)} ${cleanPhone.slice(2, 4)} ${cleanPhone.slice(4, 8)}-${cleanPhone.slice(8)}`;
  }
  
  // Колумбия: +57 1 999-9999
  if (cleanPhone.startsWith('57') && cleanPhone.length === 12) {
    return `+${cleanPhone.slice(0, 2)} ${cleanPhone.slice(2, 3)} ${cleanPhone.slice(3, 6)}-${cleanPhone.slice(6, 10)}`;
  }
  
  // Чили: +56 9 9999-9999
  if (cleanPhone.startsWith('56') && cleanPhone.length === 11) {
    return `+${cleanPhone.slice(0, 2)} ${cleanPhone.slice(2, 3)} ${cleanPhone.slice(3, 7)}-${cleanPhone.slice(7)}`;
  }
  
  // Перу: +51 1 999-9999
  if (cleanPhone.startsWith('51') && cleanPhone.length === 11) {
    return `+${cleanPhone.slice(0, 2)} ${cleanPhone.slice(2, 3)} ${cleanPhone.slice(3, 6)}-${cleanPhone.slice(6)}`;
  }
  
  // Для остальных стран - простой формат
  if (cleanPhone.length >= 10) {
    // Найдем код страны
    let countryCode = '';
    for (const code of ['593', '591', '595', '598', '506', '507']) {
      if (cleanPhone.startsWith(code)) {
        countryCode = code;
        break;
      }
    }
    if (!countryCode && cleanPhone.startsWith('58')) {
      countryCode = '58';
    }
    
    if (countryCode) {
      const phoneBody = cleanPhone.slice(countryCode.length);
      const half = Math.ceil(phoneBody.length / 2);
      return `+${countryCode} ${phoneBody.slice(0, half)}-${phoneBody.slice(half)}`;
    }
  }
  
  return phone; // Если не удалось отформатировать, возвращаем как есть
};

export const formatBrazilianPhone = formatLatinAmericanPhone;
