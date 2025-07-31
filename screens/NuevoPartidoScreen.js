import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import { collection, getDocs, addDoc, updateDoc, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { Picker } from '@react-native-picker/picker';

export default function NuevoPartidoScreen({ navigation }) {
  const [jugadores, setJugadores] = useState([]);
  const [jugador1, setJugador1] = useState('');
  const [jugador2, setJugador2] = useState('');
  const [ganador, setGanador] = useState('');
  const [resultado, setResultado] = useState('');

  useEffect(() => {
    const cargarJugadores = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'jugadores'));
        const lista = snapshot.docs.map(doc => doc.data().nombre);
        setJugadores(lista);
      } catch (error) {
        console.error('Error al cargar jugadores:', error);
      }
    };

    cargarJugadores();
  }, []);

  const guardarPartido = async () => {
    if (!jugador1 || !jugador2 || !ganador) {
      Alert.alert('Error', 'Faltan datos del partido');
      return;
    }

    try {
      await addDoc(collection(db, 'partidos'), {
        jugador1,
        jugador2,
        ganador,
        resultado,
        fecha: Timestamp.now(),
      });

      const snapshot = await getDocs(collection(db, 'jugadores'));
      const ganadorDoc = snapshot.docs.find(doc => doc.data().nombre === ganador);

      if (ganadorDoc) {
        const ref = ganadorDoc.ref;
        const puntosActuales = ganadorDoc.data().puntos || 0;
        await updateDoc(ref, { puntos: puntosActuales + 3 });
      }

      Alert.alert('Éxito', 'Partido registrado y puntos actualizados.');
      navigation.goBack();
    } catch (error) {
      console.error('Error al guardar partido:', error);
      Alert.alert('Error', 'No se pudo guardar el partido.');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.titulo}>Registrar Partido</Text>

        <Text style={styles.label}>Jugador 1:</Text>
        <Picker
          selectedValue={jugador1}
          onValueChange={setJugador1}
          style={styles.picker}
        >
          <Picker.Item label="Selecciona jugador 1" value="" />
          {jugadores
            .filter(j => j !== jugador2)
            .map(nombre => (
              <Picker.Item key={nombre} label={nombre} value={nombre} />
            ))}
        </Picker>

        <Text style={styles.label}>Jugador 2:</Text>
        <Picker
          selectedValue={jugador2}
          onValueChange={setJugador2}
          style={styles.picker}
        >
          <Picker.Item label="Selecciona jugador 2" value="" />
          {jugadores
            .filter(j => j !== jugador1)
            .map(nombre => (
              <Picker.Item key={nombre} label={nombre} value={nombre} />
            ))}
        </Picker>

        <Text style={styles.label}>Resultado:</Text>
        <TextInput
          style={styles.input}
          value={resultado}
          onChangeText={setResultado}
          placeholder="Ej: 6-3 7-5"
        />

        <Text style={styles.label}>Ganador:</Text>
        <Picker
          selectedValue={ganador}
          onValueChange={setGanador}
          style={styles.picker}
        >
          <Picker.Item label="Selecciona el ganador" value="" />
          {[jugador1, jugador2]
            .filter(j => j)
            .map(nombre => (
              <Picker.Item key={nombre} label={nombre} value={nombre} />
            ))}
        </Picker>

        <Button title="Guardar Partido" onPress={guardarPartido} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    gap: 10,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 8,
    marginBottom: 10,
  },
  picker: {
    marginBottom: 10,
  },
});

