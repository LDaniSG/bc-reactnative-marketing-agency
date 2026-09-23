# 🚀 Apex Media Agency
> Plataforma móvil nativa de gestión de marketing digital y analítica de pauta publicitaria.

**Programa:** Bootcamp React Native (SENA / Instructor: Erick Granados - `@ergrato-dev`)  
**Dominio asignado:** Agencia de Marketing Digital  
**Aprendiz:** LDaniSG (`@LDaniSG`)  
**Entidades principales:** `clients`, `campaigns`, `metrics`, `channels`

---

## 📌 Descripción General
**Apex Media Agency** es una aplicación móvil nativa diseñada para agencias de publicidad que gestionan pauta digital multi-canal. Permite a los directores de marketing y media buyers monitorear presupuestos en tiempo real, medir el **ROAS** (Return on Ad Spend), consultar el rendimiento por canal (*Meta Ads, Google Ads, TikTok Ads, LinkedIn Ads, Email Marketing*), registrar nuevos lanzamientos con creativos/banners publicitarios desde la cámara o galería, y gestionar la cartera de clientes corporativos.

---

## 🧰 Tecnologías y Herramientas

- **Framework principal:** React Native con Expo SDK 52
- **Lenguaje:** TypeScript (Tipado estricto e interfaces de dominio)
- **Navegación:** React Navigation 7 (`@react-navigation/bottom-tabs` + `@react-navigation/native-stack`)
- **Gestión de Estado Global:** React Context API (`MarketingContext`)
- **Animaciones & Micro-interacciones:** React Native `Animated` API (Spring gestual, contadores dinámicos, Skeleton Loaders)
- **Hardware & Permisos Nativos:** `expo-image-picker` (Cámara y Galería) + `expo-haptics` (Retroalimentación táctil)
- **API & Asincronía:** Servicio Mock asíncrono con `Promises`, latencia simulada y Pull-to-Refresh (`RefreshControl`)
- **Estilos:** `StyleSheet.create` con tokens de diseño en modo claro moderno (*Soft Lavender / Indigo UI*)

---

## 📊 Matriz de Cumplimiento Semanal (Semanas 01 a 09)

| Semana | Tema Principal | Evidencias y Requisitos Cumplidos | Estado |
| :---: | :--- | :--- | :---: |
| **week-01** | Core Components & Flexbox | Componentes nativos (`View`, `Text`, `Image`, `TouchableOpacity`), maquetación responsive con Flexbox y tokens de diseño con `StyleSheet`. | ✅ 100% |
| **week-02** | Listas, Inputs y Búsqueda | `FlatList` virtualizada con `keyExtractor` único, buscador interactivo en tiempo real por título o cliente y estados de vista vacía (`ListEmptyComponent`). | ✅ 100% |
| **week-03** | React Navigation | Navegación combinada con Bottom Tab Navigator y Native Stack Navigator, rutas tipadas y headers adaptativos. | ✅ 100% |
| **week-04** | Arquitectura de Estado Global | Centralización del estado de campañas y clientes para propagar cambios entre pantallas sin prop drilling. | ✅ 100% |
| **week-05** | Redes y Datos del Dominio | Capa de servicio asíncrona, simulación de respuestas de red y fallbacks locales para el dominio de marketing. | ✅ 100% |
| **week-06** | Capa de Red Asíncrona & Skeletons | Servicio `MarketingApi` con latencia simulada (`delay`), componente `SkeletonLoader` animado con opacidad pulsante y `RefreshControl` táctil. | ✅ 100% |
| **week-07** | Permisos Nativos, Media & Hápticos | Captura de banners desde Galería o Cámara con `expo-image-picker`, permisos nativos, respuesta háptica (`useHaptics`) y exportación con la API `Share`. | ✅ 100% |
| **week-08** | Micro-interacciones & Animaciones | Contadores numéricos animados (`AnimatedCounter`) para KPIs de ROAS/Dinero, animación de resorte (`Animated.spring`) en tarjetas y barras de progreso de presupuesto. | ✅ 100% |
| **week-09** | Contexto Global & Analítica Visual | Proveedor global `MarketingContext`, navegador por pestañas (`TabNavigator`), desglose de pauta por canal (`ChannelBarChart`), filtros combinados y logs de optimización. | ✅ 100% |

---

## 🛠️ Arquitectura y Estructura del Proyecto

```text
src/
├── api/
│   └── marketingApi.ts        # Servicio mock asíncrono con latencia y CRUD de campañas
├── components/
│   ├── campaigns/
│   │   └── CampaignCard.tsx   # Tarjeta interactiva animada con barra de progreso y share
│   ├── common/
│   │   ├── AnimatedCounter.tsx# Contador dinámico de métricas dinero/ROAS
│   │   └── SkeletonLoader.tsx # Pantalla de carga animada (Pulsing opacity)
│   └── metrics/
│       └── ChannelBarChart.tsx# Gráfico de barras de participación Meta/Google/TikTok/LinkedIn
├── context/
│   └── MarketingContext.tsx   # Estado global del dominio (Campañas & Clientes)
├── hooks/
│   └── useHaptics.ts          # Custom Hook para vibración nativa (Impact/Notification)
├── navigation/
│   ├── AppNavigator.tsx       # Root Stack Navigator (MainTabs, Detail, Create)
│   └── TabNavigator.tsx       # Bottom Tabs Navigator (Campañas, Canales, Clientes)
├── screens/
│   ├── DashboardScreen.tsx    # Dashboard principal con 4 KPIs, Hero Banner, Buscador y Filtros
│   ├── CampaignDetailScreen.tsx # Vista detallada con métricas clave, CPC, CTR y Canales
│   ├── CreateCampaignScreen.tsx # Formulario con cámara, galería, objetivos y hápticos
│   ├── ChannelsScreen.tsx     # Analítica de canales, health score y log de optimizaciones
│   └── ClientsScreen.tsx      # Cartera de clientes con badges de industria y contacto rápido
├── theme/
│   └── colors.ts              # Tokens de diseño (Soft Lavender Light Theme)
└── types/
    └── marketing.types.ts     # Interfaces TypeScript de Client, Campaign, Metric y Channel
```

---

## 🚀 Ejecución y Desarrollo Local

### Requisitos previos
- Node.js (v18 o superior)
- npm o yarn
- Expo Go (en dispositivo móvil físico)

### Pasos de instalación

1. Clonar el repositorio:
   git clone https://github.com/LDaniSG/bc-reactnative-marketing-agency.git
   cd bc-reactnative-marketing-agency

2. Instalar dependencias:
   npm install

3. Ejecutar en la Web:
   npx expo start --web

4. Ejecutar en celular físico:
   npx expo start --tunnel
