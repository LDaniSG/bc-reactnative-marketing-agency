# 🚀 Apex Media Agency
> Plataforma móvil nativa de gestión de marketing digital y analítica de pauta publicitaria.

**Programa:** Bootcamp React Native (SENA / Instructor: Erick Granados - `@ergrato-dev`)  
**Dominio asignado:** Agencia de Marketing Digital  
**Aprendiz:** LDaniSG (`@LDaniSG`)  
**Entidades principales:** `clients`, `campaigns`, `metrics`, `channels`

---

## 📌 Descripción General
**Apex Media Agency** es una aplicación móvil nativa diseñada para agencias de publicidad que gestionan pauta digital multi-canal. Permite a los directores de marketing y media buyers monitorear presupuestos en tiempo real, medir el **ROAS** (Return on Ad Spend), consultar el rendimiento por canal (*Meta Ads, Google Ads, TikTok Ads, LinkedIn Ads, Email Marketing*), registrar nuevos lanzamientos con creativos/banners publicitarios desde la cámara o galería, y gestionar la cartera de clientes corporativos con autenticación protegida y almacenamiento persistente.

---

## 🧰 Tecnologías y Herramientas

- **Framework principal:** React Native con Expo SDK 52
- **Gestor de paquetes:** `pnpm`
- **Lenguaje:** TypeScript (Tipado estricto e interfaces de dominio)
- **Navegación:** React Navigation 7 (`@react-navigation/bottom-tabs` + `@react-navigation/native-stack`)
- **Gestión de Estado Global & Sesión:** React Context API (`MarketingContext` & `AuthContext`)
- **Persistencia Local:** `@react-native-async-storage/async-storage` (`StorageService`)
- **Animaciones & Micro-interacciones:** React Native `Animated` API (`FadeInView`, Spring gestual, contadores dinámicos)
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
| **week-06** | Formularios y Validación | Validación de variables por campo (`titleError`, `clientError`, `budgetError`), mensajes reactivos y botón deshabilitado ante datos inválidos. | ✅ 100% |
| **week-07** | Persistencia Local | Integración de `AsyncStorage` mediante `StorageService` para guardar localmente campañas creadas y estados en el dispositivo. | ✅ 100% |
| **week-08** | Autenticación y Rutas | Contexto de autenticación (`AuthContext`), almacenamiento persistente de credenciales, pantalla `LoginScreen` y rutas protegidas. | ✅ 100% |
| **week-09** | Animaciones Básicas Nativas | Uso de la API `Animated` para transiciones de entrada (`FadeInView`), animación elástica (`Animated.spring`) y contadores numéricos dinámicos. | ✅ 100% |

---

## 🛠️ Arquitectura y Estructura del Proyecto

```text
src/
├── api/
│   └── marketingApi.ts        # Servicio mock asíncrono con latencia y CRUD persistido
├── components/
│   ├── campaigns/
│   │   └── CampaignCard.tsx   # Tarjeta interactiva animada con barra de progreso y share
│   ├── common/
│   │   ├── AnimatedCounter.tsx# Contador dinámico de métricas dinero/ROAS
│   │   ├── FadeInView.tsx     # Envoltorio animado de entrada (Opacidad + Desplazamiento)
│   │   └── SkeletonLoader.tsx # Pantalla de carga animada (Pulsing opacity)
│   └── metrics/
│       └── ChannelBarChart.tsx# Gráfico de barras de participación Meta/Google/TikTok/LinkedIn
├── context/
│   ├── AuthContext.tsx        # Estado global de sesión y autenticación de la agencia
│   └── MarketingContext.tsx   # Estado global del dominio (Campañas & Clientes)
├── hooks/
│   └── useHaptics.ts          # Custom Hook para vibración nativa (Impact/Notification)
├── navigation/
│   ├── AppNavigator.tsx       # Root Stack Navigator con condicional de autenticación
│   └── TabNavigator.tsx       # Bottom Tabs Navigator (Campañas, Canales, Clientes)
├── screens/
│   ├── LoginScreen.tsx        # Portal de inicio de sesión de la agencia
│   ├── DashboardScreen.tsx    # Dashboard principal con 4 KPIs, Hero Banner, Buscador y Filtros
│   ├── CampaignDetailScreen.tsx # Vista detallada con métricas clave, CPC, CTR y Canales
│   ├── CreateCampaignScreen.tsx # Formulario validado por campos con cámara y galería
│   ├── ChannelsScreen.tsx     # Analítica de canales, health score y log de optimizaciones
│   └── ClientsScreen.tsx      # Cartera de clientes con badges de industria y contacto rápido
├── services/
│   └── storage.ts             # Servicio de persistencia local con AsyncStorage
├── theme/
│   └── colors.ts              # Tokens de diseño (Soft Lavender Light Theme)
└── types/
    └── marketing.types.ts     # Interfaces TypeScript de Client, Campaign, Metric y Channel
```

🚀 Ejecución y Desarrollo Local
Requisitos previos
Node.js (v18 o superior)
pnpm (Gestor de paquetes oficial)
Expo Go (Opcional, en dispositivo móvil físico)
Pasos de instalación
Clonar el repositorio:
git clone https://github.com/LDaniSG/bc-reactnative-marketing-agency.git
cd bc-reactnative-marketing-agency

Instalar dependencias:
pnpm install

Ejecutar la aplicación en la Web:
npx expo start --web

⚡ Scripts de Automatización Rápida
Iniciar servidor: ./start.sh
Detener servidor: ./stop.sh

---

## 🗂️ Diccionario de Datos (Modelo del Dominio)

### 1. `Client` (Clientes / Cuentas Publicitarias)
| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `id` | `string` | Identificador único de la cuenta |
| `name` | `string` | Nombre del representante/contacto |
| `company` | `string` | Nombre de la empresa o marca |
| `email` | `string` | Correo corporativo de contacto |
| `phone` | `string` | Teléfono directo |
| `industry` | `IndustryType` | Sector (`E-commerce`, `SaaS`, `Real Estate`, `Fashion`, `Fintech`) |
| `avatarUrl` | `string` | URL de la imagen de perfil del cliente |
| `activeCampaignsCount` | `number` | Total de campañas actualmente activas |

### 2. `Campaign` (Campañas Publicitarias)
| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `id` | `string` | Identificador único de la campaña |
| `clientId` | `string` | ID del cliente asociado |
| `clientName` | `string` | Nombre de la marca que pauta |
| `title` | `string` | Título del lanzamiento publicitario |
| `objective` | `CampaignObjective` | Objetivo (`Conversions`, `Traffic`, `Brand Awareness`, `Lead Generation`) |
| `budget` | `number` | Presupuesto total asignado en USD |
| `spent` | `number` | Presupuesto consumido a la fecha en USD |
| `status` | `CampaignStatus` | Estado (`active`, `paused`, `completed`, `draft`) |
| `startDate` / `endDate` | `string` | Rango de fechas de vigencia |
| `bannerUrl` | `string` | Imagen/Creativo publicitario principal |

### 3. `Metric` (Métricas de Rendimiento)
| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `impressions` | `number` | Cantidad total de visualizaciones del anuncio |
| `clicks` | `number` | Cantidad total de interacciones/clics |
| `conversions` | `number` | Total de compras, leads o acciones objetivo completadas |
| `ctr` | `number` | Click-Through Rate en porcentaje (%) |
| `cpc` | `number` | Costo Medio por Clic en USD ($) |
| `roas` | `number` | Return on Ad Spend (Retorno de inversión publicitaria) |

### 4. `Channel` (Canales Publicitarios)
| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `id` | `string` | Identificador del canal |
| `platform` | `ChannelPlatform` | Red de pauta (`Meta Ads`, `Google Ads`, `TikTok Ads`, `LinkedIn Ads`, `Email Marketing`) |
| `budgetAllocated` | `number` | Monto asignado al canal en USD |
| `spent` | `number` | Monto ejecutado en el canal |
| `sharePercentage` | `number` | Porcentaje de participación en el presupuesto global (%) |
| `performanceScore` | `number` | Calificación de salud de la pauta (1 al 100) |
