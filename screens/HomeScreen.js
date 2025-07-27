import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎾 Tenis Ranking App</Text>
      <Button title="Ver Ranking" onPress={() => navigation.navigate('Ranking')} />
      <Button title="Ver Partidos" onPress={() => navigation.navigate('Partidos')} />
      <Button title="Nuevo Partido" onPress={() => navigation.navigate('Nuevo Partido')} />
      <Button title="Torneos" onPress={() => navigation.navigate('Torneos')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center', gap: 20
  },
  title: {
    fontSize: 24, fontWeight: 'bold', marginBottom: 30
  }
});
