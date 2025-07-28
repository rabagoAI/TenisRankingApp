// screens/HomeScreen.js
import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image, StatusBar } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <Image source={require('../assets/pista-tenis.png')} style={styles.image} />
        <View style={styles.titleRow}>
          <Ionicons name="tennisball-outline" size={26} color="#0EA5E9" />
          <Text style={styles.title}>Tenis Ranking App</Text>
        </View>

        <View style={styles.buttons}>
          <PrimaryButton title="Ver ranking" onPress={() => navigation.navigate('Ranking')} />
          <PrimaryButton title="Ver partidos" onPress={() => navigation.navigate('Partidos')} />
          <PrimaryButton title="Nuevo partido" onPress={() => navigation.navigate('Nuevo Partido')} />
          <PrimaryButton title="Torneos" onPress={() => navigation.navigate('Torneos')} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F8FAFC'
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: 140,
    height: 140,
    borderRadius: 20,
    marginBottom: 24
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 32
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0F172A' // slate-900
  },
  buttons: {
    width: '100%',
    marginTop: 8
  }
});
