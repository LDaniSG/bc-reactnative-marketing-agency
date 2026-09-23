# 🚀 Apex Media Agency

## Plataforma móvil de gestión de marketing digital

> **Programa:** Bootcamp React Native (SENA / Instructor ergrato-dev)
> **Dominio asignado:** Agencia de Marketing Digital
> **Aprendiz:** LDaniSG
> **Entidades principales:** `clients`, `campaigns`, `metrics`, `channels`

## 📌 Descripción general

**Apex Media Agency** es una aplicación móvil nativa para gestionar y monitorear campañas de publicidad digital de clientes corporativos desde un único lugar.

La aplicación permite consultar campañas, revisar su detalle, filtrar resultados, crear nuevas campañas, guardar campañas favoritas y explorar canales digitales como Meta Ads, Google Search, LinkedIn Ads, TikTok Ads y Email Marketing. También presenta métricas de negocio como presupuesto, inversión realizada, alcance estimado, CTR, CPC y ROI.

Los datos se consultan mediante un cliente REST con Axios y TanStack Query v5. El proyecto utiliza datos locales como respaldo para mantener disponible la experiencia de demostración cuando la API no responde.

## 🧰 Tecnologías

- React Native con Expo SDK 52
- TypeScript
- React Navigation 7
- Zustand
- TanStack Query v5
- Axios
- Expo Vector Icons

## 📊 Matriz de cumplimiento por semana

| Semana | Tema principal | Evidencias y requisitos cumplidos | Estado |
| :--- | :--- | :--- | :---: |
| **`week-01`** | Core Components & Flexbox Layout | Componentes nativos (`View`, `Text`, `Image`, `Pressable`), maquetación responsive con Flexbox y estilos estructurados con `StyleSheet.create`. | ✅ **100%** |
| **`week-02`** | Listas, inputs y estilos | `FlatList` virtualizada, `keyExtractor` único, filtro en tiempo real con `TextInput` y `useMemo`, estado vacío personalizado, tokens de diseño y manejo del teclado. | ✅ **100%** |
| **`week-03`** | React Navigation 7 | Navegación combinada con **Bottom Tab Navigator** y **Native Stack Navigator**, rutas tipadas e integración de iconos `Ionicons`. | ✅ **100%** |
| **`week-04`** | Estado global con Zustand | Tienda global `useSavedCampaignsStore`, guardado y eliminación de campañas favoritas, y contador dinámico en la pestaña de navegación. | ✅ **100%** |
| **`week-05`** | Redes y APIs | Cliente Axios (`src/services/api.ts`), hooks de TanStack Query (`useCampaigns`, `useCreateCampaign`), pull-to-refresh, creación de campañas y estados de carga y error. | ✅ **100%** |

## 🛠️ Arquitectura y estructura del proyecto

```text
src/
├── components/          # Componentes de UI reutilizables (ItemCard.tsx)
├── data/                # Datos simulados del dominio (mockData.ts)
├── hooks/               # Hooks de TanStack Query (useItems.ts)
├── navigation/          # Tab Navigator y Stack Navigator tipados
├── screens/             # Pantallas de campañas, detalle, creación, guardados y canales
├── services/            # Cliente HTTP Axios (api.ts)
├── stores/              # Estado global de favoritos (savedStore.ts)
├── theme/               # Tokens de diseño y colores (index.ts)
└── types/               # Interfaces TypeScript del dominio
```

## 🚀 Ejecución

### Requisitos

- Node.js instalado
- npm instalado
- Expo CLI disponible mediante `npx`

### Instalación y desarrollo

```bash
npm install
npx expo start --web
```

También están disponibles los scripts para iniciar el proyecto en cada plataforma:

```bash
npm run android
npm run ios
npm run web
```