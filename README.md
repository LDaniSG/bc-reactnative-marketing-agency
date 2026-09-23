# 🚀 Semana 06 - Capa de Red, API Mock Asíncrona y Skeleton Loaders

**Dominio:** Agencia de Marketing Digital  
**Entidades:** `clients`, `campaigns`, `metrics`, `channels`

## 📋 Descripción de la Entrega
En esta semana se implementó la arquitectura de consumo de datos asíncrono para la gestión de campañas publicitarias, agregando estados de carga visuales y sincronización en tiempo real.

## 🛠️ Implementaciones Técnicas
- **Servicio `MarketingApi` (`src/api/marketingApi.ts`):** Métodos asíncronos con promesas y latencia simulada (`delay`) para emular un servidor remoto de marketing.
- **Componente `SkeletonLoader` (`src/components/common/SkeletonLoader.tsx`):** Animación de opacidad pulsante con `Animated.loop` para simular la carga de las tarjetas de campaña.
- **Pull-to-Refresh:** Actualización táctil del panel con `RefreshControl`.
- **Manejo de Estados:** Renderizado condicional de la UI para Carga (`Loading`), Datos Vacíos (`Empty`) y Éxito (`Success`).