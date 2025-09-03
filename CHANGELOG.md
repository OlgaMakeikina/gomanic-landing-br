# CHANGELOG

## [2.3.0] - 2025-09-03 - Icon Assets Update

### 🎨 Favicon & App Icons Refresh
- **6 Files Updated**: All favicon и app icon files replaced
- **SEO Ready**: Optimized for all browser tabs и devices
- **PWA Support**: Android Chrome 192x192 + 512x512 icons
- **iOS Optimized**: Apple touch icon for Safari bookmarks
- **Standard Compliance**: favicon.ico + PNG variants (16x16, 32x32)

### 📂 Updated Assets
```
public/icons/
├── android-chrome-192x192.png  [NEW BRANDING]
├── android-chrome-512x512.png  [NEW BRANDING]
├── apple-touch-icon.png        [NEW BRANDING]
├── favicon-16x16.png           [NEW BRANDING]
├── favicon-32x32.png           [NEW BRANDING]
└── favicon.ico                 [NEW BRANDING]
```

### 🏗️ Architecture Integrity
- **Zero Code Changes**: Только статичные assets обновлены
- **Modular Structure**: Архитектура компонентов не затронута
- **TypeScript Compliance**: Никаких изменений в .ts/.tsx файлах
- **Production Ready**: Готово к деплою без дополнительной настройки

## [2.1.7] - 2025-08-23 - Service Selection Added to Booking Form

### 📋 Service Options Integration
- **3 Service Options**: MANICURE + GEL (R$80), ALONGAMENTO + GEL (R$119), COMBO COMPLETO (R$160)
- **Interactive Selection**: Glassmorphism cards с hover и selected states
- **Required Validation**: Обязательный выбор услуги перед отправкой
- **Price Display**: Четкое отображение цен в Horizon шрифте

### 🎨 Glassmorphism Service Cards
- **Selection Design**: backdrop-blur-sm с dynamic opacity
- **Active State**: border-white/60 + rgba(255, 255, 255, 0.25) background
- **Hover Effects**: border-white/40 с smooth transitions
- **Typography**: Garet для названий, Horizon для цен

### 🔧 Technical Implementation
- **Form State**: Добавлено поле service в formData
- **API Integration**: booking/route.ts обновлен для service field
- **N8N Data**: service передается в N8N webhook
- **Validation**: Client и server side проверки для service

### 📊 User Experience Improvements
- **Click to Select**: Клик по карточке выбирает услугу
- **Visual Feedback**: Четкая индикация выбранной опции
- **Error Handling**: Сообщение при отсутствии выбора услуги
- **Accessibility**: Radio buttons с keyboard navigation

## [2.1.6] - 2025-08-23 - Glassmorphism Form Design (SegurancaQualidade Style)

### 🌟 Glassmorphism Integration
- **Style Adoption**: Форма теперь использует стили из раздела HIGIENE E QUALIDADE
- **GLASS Constants**: cardBg, cardBorder, cardShadow как в SegurancaQualidade
- **Visual Consistency**: Точное соответствие glassmorphism эстетике
- **Modern UI**: Актуальные тренды стеклянного дизайна

### 🎨 Form Redesign Elements
- **Container**: backdrop-blur-xl с rounded-2xl углами
- **Gradient Layers**: from-white/15 и from-black/20 для глубины
- **Input Fields**: Полупрозрачные поля с white borders
- **Typography**: Белый текст Garet с 0.22em spacing
- **Button**: Gradient кнопка в стиле SegurancaQualidade

### 🔧 Technical Implementation
- **CSS Classes**: Добавлен .glass-input для плейсхолдеров
- **Cross-browser**: Поддержка всех браузеров для плейсхолдеров
- **Z-layering**: Правильное наслоение градиентов
- **Performance**: Оптимизированные blur эффекты

### ✨ Visual Enhancements
- **Premium Look**: Роскошный стеклянный эффект
- **Background Integration**: Красиво сочетается с фоном
- **Depth Effect**: Многослойные градиенты создают объем
- **Brand Harmony**: Консистентность с остальным сайтом

## [2.1.4] - 2025-08-23 - Background Update: White Nails Minimalism

### 🖼️ Background Image Replacement
- **New Image**: Белые ногти с iPhone - минималистичная Vogue эстетика
- **Color Palette**: Нейтральные тона вместо контрастных красных
- **Style Enhancement**: Более утонченный и элегантный вид
- **File Optimization**: Переименован в простое имя contact-bg.jpeg

### 🎨 Visual Improvements
- **Overlay Adjustment**: rgba(68, 78, 85, 0.75) для лучшего контраста
- **Text Readability**: Оптимизирована читаемость белого текста
- **Brand Consistency**: Лучшее соответствие минималистичному стилю Vogue
- **Professional Look**: Премиум качество фотографии

### 🧹 Code Cleanup
- **Removed**: Тестовый компонент ImageTest.tsx
- **Cleaned**: Импорты из page.tsx
- **Optimized**: Пути к изображениям

## [2.1.3] - 2025-08-23 - Background Image + Glassmorphism Form

### 🎨 Visual Enhancement - Vogue Editorial Style
- **Background Image**: Добавлен портрет в стиле Vogue для секции AGENDE SEU HORÁRIO
- **Dark Overlay**: Темный фильтр rgba(68, 78, 85, 0.85) для читаемости
- **Glassmorphism Form**: Прозрачная форма с backdrop-blur эффектом
- **White Text Styling**: Адаптированы все элементы для темного фона

### 🔧 Technical Implementation
- **Full-Screen Section**: min-h-screen для полноэкранного отображения
- **Responsive Image**: center/cover positioning для всех устройств  
- **Z-layering**: Proper overlay и content positioning
- **Form Enhancement**: Стеклянные поля с белыми плейсхолдерами

### ✨ UX Improvements
- **Visual Impact**: Премиум look модного журнала
- **Brand Consistency**: Сохранены цвета Gomanic palette
- **Form Focus**: Glassmorphism выделяет booking form
- **Professional Feel**: Editorial photography styling

## [2.1.2] - 2025-08-23 - Форма Booking: Упрощение + N8N Интеграция

### 📋 Form Simplification
- **Reduced Fields**: Только Name, Phone, Email (все обязательные)
- **Removed Fields**: service, date, notes - больше не нужны
- **Better UX**: Более быстрое заполнение формы
- **Email Promise**: Пользователи получат ссылки на почту

### 🔗 N8N Integration
- **New Utility**: `src/utils/n8n.ts` для интеграции
- **API Refactor**: `booking/route.ts` переключен на N8N
- **Environment**: Добавлена переменная `N8N_WEBHOOK_URL`
- **Data Flow**: Form → API → N8N → Email с ссылками

### 🎯 Technical Changes
- **TypeScript**: Полная типизация N8N интеграции
- **Error Handling**: Улучшенные сообщения об ошибках
- **Validation**: Все 3 поля теперь required
- **Messages**: Обновлены тексты для лучшего UX
- **Integration Fix**: ContactSection заменен на BookingForm
- **Analytics Fix**: Решен конфликт analytics.js/analytics.ts

### ⚡ Production Ready
- **Backward Compatible**: Старые формы продолжат работать
- **Module Structure**: Сохранена архитектура ≤70 строк
- **Testing Ready**: TypeScript проверка пройдена ✅
- **Server Status**: Работает на localhost:3004 ✅
- **Form Integration**: ContactSection → BookingForm ✅

## [2.1.1] - 2025-08-22 - Mobile Clients Gallery: 2x2 Grid + Full-Width CTA

### 📱 UX Improvement Based on Feedback
- **2x2 Grid Layout**: Two photos per row with square aspect ratios
- **Full Content Visibility**: All 4 photos/video visible at once (no carousel)
- **Full-Width CTA**: Bottom banner spanning entire screen width
- **Better Content Discovery**: Users see all examples immediately

### 🎨 Design System Maintained
- **Aspect Ratios**: Perfect squares for consistent mobile experience
- **Glassmorphism CTA**: Full-width banner with enhanced visibility
- **Touch Optimization**: Larger tap targets with 3px gap spacing
- **Vogue Colors**: Strict adherence to #FEFEFE, #3B3B3A, #444f55

### ⚡ Performance Optimizations
- **Simplified Layout**: Removed carousel complexity
- **GPU Acceleration**: Maintained for all image transforms
- **Touch Responsiveness**: Optimized for mobile interactions
- **Bundle Size**: Reduced DOM complexity

## [2.1.0] - 2025-08-22 - Mobile Clients Section: Instagram Stories Style

### 📱 Major Mobile UX Enhancement
- **Instagram Stories Layout**: Vertical story-style feed for mobile clients section
- **Floating CTA**: Glassmorphism overlay CTA positioned over hero image
- **Horizontal Carousel**: Touch-friendly thumbnail gallery with hidden scrollbar
- **85vh Hero Image**: Full-screen impact with gradient overlay for readability

### 🏗️ Architecture Updates
- **Desktop/Mobile Split**: 
  - Desktop: Pinterest grid layout preserved (hidden on mobile)
  - Mobile: New vertical story-style layout (hidden on desktop)
- **ClientsSection.tsx**: Enhanced with responsive design patterns
- **Performance Optimization**: GPU-acceleration for all mobile animations

### 🎨 Design System Enhancement
- **Glassmorphism CTA**: `backdrop-blur-xl` with rgba overlays
- **Touch Optimization**: 44px+ touch targets, tap highlight removal
- **Safe Area Support**: iPhone notch compatibility with `env(safe-area-inset-bottom)`
- **Vogue Style Maintained**: Strict color scheme adherence (#FEFEFE, #3B3B3A, #444f55)

### ⚡ Performance Improvements
- **Mobile-First CSS**: Separate mobile styles in globals.css
- **Image Optimization**: `transform: translateZ(0)` for GPU acceleration
- **Touch Scrolling**: `-webkit-overflow-scrolling: touch` for smooth carousels
- **Reduced Layout Shift**: Fixed heights and proper aspect ratios

## [2.0.3] - 2025-08-22 - Mobile RESULTADOS v2.0: Single Photo + Swipe UX

### 📱 Mobile UX Enhancement v2.0
- **Single Photo Focus**: One centered photo per view for better content focus
- **Swipe Navigation**: Natural touch gestures replace button controls
- **Dots Indicator**: Visual progress with direct navigation capability
- **Removed Arrow Buttons**: Cleaner interface without visual clutter

### 🏗️ Technical Architecture v2.0
- **Redesigned Components**: 
  - `MobilePortfolioSlider.tsx` - Single photo + swipe (68 lines, reduced from 87)
  - `MobileBeforeAfterSlider.tsx` - Single photo + swipe (68 lines, reduced from 87)
- **Touch Events**: TouchStart/Move/End handling for swipe detection
- **CSS Transitions**: `cubic-bezier(0.4, 0, 0.2, 1)` for smooth animations
- **Cleaner Code**: Removed button state management complexity

### 🎨 Design Enhancement
- **Vogue Style Preserved**: Maintained color scheme (#FEFEFE, #444f55)
- **Single Photo Layout**: 320px height, 16px border-radius, elegant shadows
- **Dots Navigation**: Touch-friendly 12px dots with scale(1.2) active state
- **Minimalist Approach**: Focus on content without UI distractions

### ✅ Quality Improvements
- **TypeScript**: ✅ Strict typing, no errors
- **Architecture**: ✅ More modular, reduced complexity
- **Performance**: ✅ Priority loading, CSS-based animations
- **UX**: ✅ Improved mobile experience with natural gestures

---

## [2.0.2] - 2025-08-21 - Hero Title Order and Alignment Update

### 🎨 UI/UX Improvements
- **Hero Title Word Order**: Changed to "Especialistas GOMANIC" for proper size display
- **Font Sizes**: "GOMANIC" now displays in large font, "Especialistas" in smaller font
- **Center Alignment**: All content centered (title, location info, buttons)
- **Adaptive Location Positioning**: Location block centers when title is centered, right-aligns when title is left-aligned

### 🔧 Technical Changes
- Updated hero slide data with new title order
- Enhanced HeroTitle with conditional location positioning
- Improved Slide1 layout with center alignment
- Added responsive logic for location block positioning

---

## [2.0.1] - 2025-08-21 - Hero Section Layout Enhancement

### 🎨 UI/UX Improvements
- **Hero Slide 1 Layout Update**: 
  - Buttons now arranged in single row on desktop
  - Added location info block precisely under H1 (main title), not under all title content
  - Location block aligned right on desktop, centered on mobile
  - Location info shows "UNHAS 5 ESTRELAS" with location icon
  - Improved responsive design for mobile and desktop
  - Glass morphism effect for location info block
- **Component Architecture**: Enhanced HeroTitle with alignment support
- **TypeScript Improvements**: Fixed import paths in components index

### 🔧 Technical Changes
- Enhanced `HeroTitle.tsx` with `showLocationInfo` prop for conditional location display
- Moved location block logic from Slide1 to HeroTitle for better encapsulation
- Added Next.js Image optimization for location icon within HeroTitle
- Fixed component import paths in `index.ts`
- Improved component modularity and reusability

### 📱 Responsive Design
- Desktop: single column layout with right-aligned location info precisely under H1
- Mobile: centered layout with location info centered under H1
- Adaptive button arrangement (row/column based on screen size)
- Conditional rendering: location info only shows when `showLocationInfo={true}`

---

## [2.0.0] - 2025-08-20 - PRODUCTION READY RELEASE

### 🚀 Major Features Added
- **Google Analytics 4** integration with event tracking
- **Facebook Pixel** integration for conversions
- **FreSHA CRM** API integration for bookings
- **SEO optimization** with structured data and meta tags
- **Docker containerization** for easy deployment
- **GitHub Actions** CI/CD pipeline
- **Performance optimization** for production

### 📦 New Components
- `BookingForm` component with analytics tracking
- `analytics.ts` utility for GA4 and custom events
- `crm.ts` utility for FreSHA API integration
- `seo.ts` configuration for search optimization
- API routes for form handling and fallback

### 🔧 Infrastructure
- Production-ready `next.config.js` with security headers
- PM2 configuration for server deployment
- Environment variables structure for all services
- Docker support with multi-stage builds
- Deployment scripts for Windows and Linux

### 🛡️ Security & Performance
- CSP headers and security policies
- Image optimization and font preloading
- Bundle analysis setup
- Error handling and fallback systems

---

## [1.0.0] - 2025-08-13 - INITIAL VOGUE DESIGN

### ✨ Initial Features
- Vogue magazine style design implementation
- Brazilian Portuguese localization
- Responsive mobile-first layout
- Horizon and Inter font integration
- Gomanic color scheme (#FEFEFE, #F5E4E6, #3B3B3A)

### 📱 Sections Implemented
- Header with logo and navigation
- Hero section with magazine masthead
- Editorial benefits section
- Process steps visualization
- Limited offer call-to-action
- Portfolio gallery with testimonials
- Booking form (basic version)
- Footer with contact information

### 🎨 Design System
- Tailwind CSS configuration
- Custom Vogue-style components
- Editorial typography system
- Mobile navigation menu
- Hover effects and animations

---

## Migration Notes

### From v1.0.0 to v2.0.0
- **Environment Variables**: New variables added for analytics and CRM
- **API Routes**: New `/api/booking` and `/api/fallback-booking` endpoints
- **Dependencies**: Added analytics and form handling libraries
- **Build Process**: Enhanced with type checking and linting
- **Deployment**: New Docker and PM2 configurations

### Breaking Changes
- `layout.tsx` now requires environment variables for analytics
- Form components moved to `/components/tracking/`
- Analytics tracking must be configured before forms work properly

---

## Upcoming Features

### v2.1.0 (Planned)
- [ ] MercadoPago payment integration
- [ ] WhatsApp Business API integration
- [ ] Email automation with SMTP
- [ ] Advanced analytics dashboards
- [ ] A/B testing framework

### v2.2.0 (Future)
- [ ] Multi-language support (English version)
- [ ] Advanced SEO features (sitemap generation)
- [ ] Progressive Web App (PWA) capabilities
- [ ] Real-time chat integration

---

## Contributors
- **Olga Makeikina** - Initial development and design
- **Production Team** - SEO, analytics, and deployment setup