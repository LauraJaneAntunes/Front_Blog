//src\components\Button.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type ButtonCustomProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
};

const Button: React.FC<ButtonCustomProps> = ({ title, onPress, disabled = false }) => {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.buttonDisabled]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    marginBottom: 10,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: '#181818',
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#777',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Button;