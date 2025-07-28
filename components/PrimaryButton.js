import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function PrimaryButton({ title, onPress }) {
  return (
    <TouchableOpacity style={styles.btn} activeOpacity={0.85} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    width: '100%',
    height: 48,
    borderRadius: 14,
    backgroundColor: '#0EA5E9',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 14,
    shadowColor: '#0EA5E9',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.3
  }
});
