# Google Tag Manager Integration - Complete

## 🎯 Задача выполнена
Успешно интегрирован Google Tag Manager (GTM) в проект Gomanic Brasil Landing согласно документации.

## 📋 Что было сделано

### 1. Обновлен layout.tsx
**Файл:** `src/app/layout.tsx`

**Добавлено:**
- GTM скрипт в `<head>` секции с правильной инициализацией
- noscript iframe сразу после `<body>` для пользователей без JavaScript
- Переменные окружения для GTM_ID

**Код GTM в head:**
```typescript
<Script id="google-tag-manager" strategy="afterInteractive">
  {`
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','${GTM_ID}');
  `}
</Script>
```

**noscript в body:**
```typescript
<noscript>
  <iframe 
    src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
    height="0" 
    width="0" 
    style={{display:'none', visibility:'hidden'}}
  />
</noscript>
```

### 2. Обновлен .env.local
**Добавлены переменные окружения:**
```env
GOOGLE_TAG_MANAGER_ID=GTM-K3WQ6V4M
FACEBOOK_PIXEL_ID=XXXXXXXXXX
```

### 3. Расширен utils/analytics.ts
**Добавлены GTM функции:**
- `gtmEvent()` - отправка событий в dataLayer
- Обновлены `trackFormSubmission()`, `trackButtonClick()`, `trackPageView()` для работы с GTM
- Добавлена поддержка двойной аналитики (GA4 + GTM)

### 4. Исправлена ошибка TypeScript
**Файл:** `src/utils/facebook-pixel.ts`
- Добавлена функция `trackCompleteRegistration()` для совместимости

### 5. Обновлен package.json
- Убран фиксированный порт 3004 для dev режима

## 🔧 Технические детали

### GTM Integration
- **GTM ID:** GTM-K3WQ6V4M
- **Стратегия загрузки:** afterInteractive (оптимальна для SEO)
- **Fallback:** noscript iframe для браузеров без JS
- **Environment:** Переменная GOOGLE_TAG_MANAGER_ID

### Совместимость
- ✅ Next.js 14.0.4
- ✅ TypeScript strict mode
- ✅ Существующий GA4 код остается рабочим
- ✅ Facebook Pixel остается рабочим
- ✅ SSR совместимость

### События в dataLayer
```typescript
// Пример использования
gtmEvent('form_submit', {
  form_type: 'booking_form',
  event_category: 'engagement'
});

gtmEvent('button_click', {
  button_name: 'cta_button',  
  event_category: 'interaction'
});

gtmEvent('page_view', {
  page_name: 'home',
  event_category: 'navigation'
});
```

## 🚀 Запуск и проверка

### Локальная разработка
```bash
cd D:\projects\gomanic-landing-br
npm run dev
# Доступно на http://localhost:3000
```

### Проверка GTM
1. Открыть DevTools > Network
2. Найти запросы к googletagmanager.com
3. Проверить dataLayer в Console: `window.dataLayer`
4. Использовать GTM Preview mode для debug

### Проверка TypeScript
```bash
npm run type-check  # ✅ Без ошибок
```

## 📊 Структура событий

### Отправка в обе системы
Каждая функция аналитики теперь отправляет данные в:
1. **Google Analytics 4** (через gtag)
2. **Google Tag Manager** (через dataLayer)

### Преимущества GTM
- Управление тегами без изменения кода
- A/B тестирование настроек
- Дополнительные пиксели/счетчики через интерфейс
- Расширенная сегментация и триггеры

## ✅ Checklist выполнения

- [x] GTM скрипт в head (стратегия afterInteractive)
- [x] noscript iframe после body tag  
- [x] Environment переменные настроены
- [x] Функции аналитики обновлены для GTM
- [x] TypeScript ошибки исправлены
- [x] Совместимость с существующим кодом
- [x] Проект запускается без ошибок
- [x] Type checking проходит успешно

## 📈 Следующие шаги

1. **В GTM панели:**
   - Настроить триггеры для событий
   - Добавить дополнительные теги (если нужно)
   - Настроить конверсии для форм бронирования

2. **Тестирование:**
   - Проверить события в GTM Preview
   - Убедиться в корректной передаче данных
   - Протестировать на всех типах устройств

3. **Production deploy:**
   - Обновить GOOGLE_TAG_MANAGER_ID в production environment
   - Проверить работу GTM на live сайте

---
**Статус:** ✅ Готово к production  
**Дата:** 1 сентября 2025  
**Версия:** v2.0.0 + GTM Integration