# 📸 Semana 07 - Permisos Nativos, Multimedia y Retroalimentación Háptica

**Dominio:** Agencia de Marketing Digital  
**Entidades:** `clients`, `campaigns`, `metrics`, `channels`

## 📋 Descripción de la Entrega
En esta semana se integraron características nativas del dispositivo móvil para la captura y subida de creativos publicitarios (banners), junto con respuestas hápticas y exportación de reportes.

## 🛠️ Implementaciones Técnicas
- **Expo ImagePicker (`src/screens/CreateCampaignScreen.tsx`):** Selección de banners desde la galería o captura directa con la cámara del dispositivo.
- **Gestión de Permisos Nativos:** Verificación previa de permisos de cámara y biblioteca de fotos.
- **Hook `useHaptics` (`src/hooks/useHaptics.ts`):** Vibraciones hápticas al confirmar acciones (crear campaña, pausar pauta).
- **API `Share` Nativa:** Exportación de informes de rendimiento de la campaña (ROAS, conversiones, inversión) a aplicaciones externas.