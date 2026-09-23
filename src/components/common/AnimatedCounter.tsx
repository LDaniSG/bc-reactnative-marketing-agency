import React, { useEffect, useRef, useState } from 'react';
import { Text, Animated, StyleSheet } from 'react-native';

interface CounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  style?: object;
}

export const AnimatedCounter: React.FC<CounterProps> = ({
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
  style,
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [displayValue, setDisplayValue] = useState('0');

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: value,
      duration: 1200,
      useNativeDriver: false,
    }).start();

    const listener = animatedValue.addListener((v) => {
      setDisplayValue(`${prefix}${v.value.toFixed(decimals)}${suffix}`);
    });

    return () => {
      animatedValue.removeListener(listener);
    };
  }, [value]);

  return <Text style={[styles.text, style]}>{displayValue}</Text>;
};

const styles = StyleSheet.create({
  text: {
    color: '#F9FAFB',
    fontSize: 22,
    fontWeight: '800',
  },
});