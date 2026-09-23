# 🎨 Semana 09 - Animaciones Básicas con la API Animated

**Dominio:** Agencia de Marketing Digital  
**Entidades:** `clients`, `campaigns`, `metrics`, `channels`

## 📋 Descripción
Integración de la API nativa `Animated` de React Native para la creación de micro-interacciones y transiciones fluidas en la interfaz de usuario:
- **`FadeInView` (`src/components/common/FadeInView.tsx`):** Animación compuesta de entrada con opacidad gradual (`Animated.timing`) y desplazamiento elástico (`Animated.spring`).
- **Contadores Numéricos Animados (`src/components/common/AnimatedCounter.tsx`):** Interpolación de valores de dinero e indicadores de ROAS.
- **Micro-interacciones Gestuales (`src/components/campaigns/CampaignCard.tsx`):** Respuesta de escalado elástico `Animated.spring` al interactuar con las tarjetas de pauta publicitaria.