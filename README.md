# 📊 Semana 09 - Estado Global, Analítica de Canales y Navegación Final

**Dominio:** Agencia de Marketing Digital  
**Entidades:** `clients`, `campaigns`, `metrics`, `channels`

## 📋 Descripción de la Entrega
Entrega final que consolida la arquitectura completa del proyecto con estado global, analítica gráfica por canal publicitario, filtros interactivos y navegación por pestañas.

## 🛠️ Implementaciones Técnicas
- **Estado Global (`src/context/MarketingContext.tsx`):** Uso de `React Context` para la gestión centralizada de campañas y clientes.
- **Navegación por Pestañas (`src/navigation/TabNavigator.tsx`):** Menú inferior con pantallas dedicadas para *Campañas*, *Canales* y *Clientes*.
- **Desglose de Canales (`src/components/metrics/ChannelBarChart.tsx`):** Gráfico de distribución de pauta para Meta Ads, Google Ads, TikTok Ads y LinkedIn Ads.
- **Buscador y Filtros Combinados:** Búsqueda en tiempo real y filtrado de campañas por estado (*Activas / Pausadas*).