import 'react-native-gesture-handler'; // ponlo el primero
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import RankingScreen from './screens/RankingScreen';
import PartidosScreen from './screens/PartidosScreen';
import TorneosScreen from './screens/TorneosScreen';
import NuevoPartidoScreen from './screens/NuevoPartidoScreen';
import AgregarJugadorScreen from './screens/AgregarJugadorScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  console.log('RankingScreen es:', RankingScreen); // debe ser una función
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inicio">
        <Stack.Screen name="Inicio" component={HomeScreen} />
        <Stack.Screen name="Ranking" component={RankingScreen} />
        <Stack.Screen name="Partidos" component={PartidosScreen} />
        <Stack.Screen name="Nuevo Partido" component={NuevoPartidoScreen} />
        <Stack.Screen name="Torneos" component={TorneosScreen} />
        <Stack.Screen name="AgregarJugador" component={AgregarJugadorScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
