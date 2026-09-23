import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { darkTheme } from '../theme/colors';

export const LoginScreen = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('admin@apex.com');
  const [password, setPassword] = useState('123456');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Campos Incompletos', 'Ingresa correo y contraseña.');
      return;
    }

    setLoading(true);
    const success = await login(email, password);
    setLoading(false);

    if (!success) {
      Alert.alert('Acceso Denegado', 'Credenciales incorrectas (Demo: admin@apex.com / 123456)');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.logo}>⚡ Apex Media Agency</Text>
        <Text style={styles.subtitle}>Portal de Gestión de Pauta Publicitaria</Text>

        <Text style={styles.label}>Correo Corporativo</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="admin@apex.com"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Contraseña</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="••••••"
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.buttonText}>🔑 Iniciar Sesión</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.hint}>Demo: admin@apex.com / 123456</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: darkTheme.background, justifyContent: 'center', padding: 20 },
  card: { backgroundColor: darkTheme.surface, padding: 24, borderRadius: 20, borderWidth: 1.5, borderColor: darkTheme.surfaceBorder },
  logo: { fontSize: 24, fontWeight: '800', color: darkTheme.primary, textAlign: 'center' },
  subtitle: { fontSize: 13, color: darkTheme.textSecondary, textAlign: 'center', marginBottom: 24, marginTop: 4 },
  label: { fontSize: 12, fontWeight: '700', color: darkTheme.textSecondary, marginBottom: 6, textTransform: 'uppercase' },
  input: { backgroundColor: '#EEF2FF', borderRadius: 12, padding: 14, fontSize: 14, color: darkTheme.textPrimary, marginBottom: 16 },
  button: { backgroundColor: darkTheme.primary, padding: 16, borderRadius: 14, alignItems: 'center', marginTop: 8 },
  buttonText: { color: '#FFF', fontSize: 16, fontWeight: '800' },
  hint: { fontSize: 11, color: darkTheme.textMuted, textAlign: 'center', marginTop: 16 },
});