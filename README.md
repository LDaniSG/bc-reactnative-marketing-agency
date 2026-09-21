# Semana 05 — Redes y APIs con Axios + TanStack Query v5

> **Bootcamp:** React Native (SENA / Instructor ergrato-dev)
> **Dominio:** Agencia de Marketing Digital (`Apex Media Agency`)
> **Aprendiz:** LDaniSG
> **Entidades:** `clients`, `campaigns`, `metrics`, `channels`

## 📋 Evidencias de la semana 05

- Cliente HTTP Axios configurado en `src/services/api.ts`.
- Hooks de TanStack Query v5 para consultar y crear campañas:
  - `useCampaigns` con `useQuery`.
  - `useCreateCampaign` con `useMutation`.
- Lista principal conectada al hook de campañas.
- Actualización mediante pull-to-refresh con `RefreshControl`.
- Estados de carga, error y reintento visibles en la pantalla principal.
- Creación de campañas mediante una pantalla presentada como modal.
- Invalidación de la consulta de campañas después de crear una campaña.
- Persistencia en memoria de campañas guardadas mediante Zustand, con contador en la navegación.

## 📌 Descripción del proyecto

**Apex Media Agency** es una aplicación móvil para gestionar campañas de publicidad digital de clientes corporativos. Permite consultar campañas, revisar métricas de presupuesto, inversión, alcance, CTR, CPC y ROI, guardar campañas favoritas y crear nuevas campañas desde la aplicación.

Los datos pertenecen al dominio de marketing digital e incluyen canales como Meta Ads, Google Search, LinkedIn Ads, TikTok Ads y Email Marketing.

## 🛠️ Estructura relacionada con la semana 05

```text
src/
├── hooks/useItems.ts              # useCampaigns y useCreateCampaign
├── navigation/RootNavigator.tsx  # Navegación y modal de creación
├── screens/HomeScreen.tsx         # Consulta, refresco, carga y error
├── screens/CreateScreen.tsx       # Formulario de nueva campaña
├── screens/DetailScreen.tsx       # Detalle y guardado con Zustand
├── screens/SavedScreen.tsx        # Campañas guardadas
├── services/api.ts                # Cliente Axios
├── stores/savedStore.ts           # Estado global de favoritos
└── types/index.ts                 # Tipos TypeScript del dominio
```

## 🚀 Ejecución

```bash
npm install
npx expo start --web
```

También se puede ejecutar en Android o iOS:

```bash
npm run android
npm run ios
```
