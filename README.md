# 🚀 GOMANIC BRASIL - PRODUCTION READY v2.3

## ✅ STATUS: ГОТОВ К VPS ДЕПЛОЮ + ОБНОВЛЕННЫЕ ИКОНКИ

### 🆕 ПОСЛЕДНЕЕ ОБНОВЛЕНИЕ (3 сентября 2025):
- **Иконки обновлены**: Все favicon файлы заменены на новый брендинг
- **PWA готовность**: Android Chrome + iOS Safari иконки
- **SEO оптимизация**: Все browser tabs будут отображать новые иконки

### 🎯 СИСТЕМА:
- **Next.js 14** + TypeScript + Tailwind
- **MercadoPago** интеграция (MOCK → PROD)
- **13 стран Латам** валидация телефонов
- **JSON storage** + N8N webhook
- **Email**: vip@gomanic.com.br
- **WhatsApp**: +55 48 99917-0099

### 🎨 ОБНОВЛЕННЫЕ ASSETS:
```
public/icons/           [ВСЕ ОБНОВЛЕНЫ]
├── favicon.ico         - Основной favicon
├── favicon-16x16.png   - Малые tabs
├── favicon-32x32.png   - Стандартные tabs
├── android-chrome-*    - PWA иконки
└── apple-touch-icon    - iOS Safari
```

### 📱 ПОДДЕРЖКА СТРАН:
🇧🇷🇦🇷🇲🇽🇨🇴🇨🇱🇵🇪🇻🇪🇪🇨🇧🇴🇵🇾🇺🇾🇨🇷🇵🇦

### 💳 УСЛУГИ:
- Manicure + Gel: **R$ 80**  
- Alongamento + Gel: **R$ 119**
- Combo Completo: **R$ 160**

### 🔄 ФЛОУ:
1. Форма → Валидация → Сохранение
2. MercadoPago → Оплата → Webhook
3. N8N + Email уведомления

### ⚙️ ENV ПЕРЕМЕННЫЕ:
```env
NEXT_PUBLIC_SITE_URL=https://gomanic.com.br
MERCADOPAGO_ACCESS_TOKEN=APP_USR-токен
EMAIL_USER=vip@gomanic.com.br
EMAIL_PASS=avlfB%66
WHATSAPP_BUSINESS_NUMBER=5548991700099
N8N_WEBHOOK_URL=webhook-url
```

### 🌐 ССЫЛКИ:
- **Git**: https://github.com/OlgaMakeikina/gomanic-landing-br
- **MercadoPago**: https://www.mercadopago.com.br/developers
- **Build**: `npm run build` ✅
- **Порт**: 3000 (продакшн)

**Commit**: `32d465b` - готов к VPS деплою
