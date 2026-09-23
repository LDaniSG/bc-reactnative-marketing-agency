#!/usr/bin/env bash
echo "🚀 Iniciando Apex Media Agency (React Native / Expo)..."

if [ ! -d "node_modules" ]; then
  echo "📦 Instalando dependencias..."
  npm install
fi

echo "⚡ Arrancando servidor Expo Web..."
npx expo start --web
