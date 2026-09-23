#!/usr/bin/env bash
echo "🛑 Deteniendo servidor Expo / Metro Bundler..."

# Detener procesos en el puerto 8081 o procesos Expo/Metro
fuser -k 8081/tcp 2>/dev/null || true
fuser -k 19006/tcp 2>/dev/null || true
pkill -f "expo" 2>/dev/null || true
pkill -f "metro" 2>/dev/null || true

echo "✅ Servidor detenido correctamente."
