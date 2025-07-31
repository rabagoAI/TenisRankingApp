import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

export default function AgregarJugadorScreen({ navigation }) {
  const [nombre, setNombre] = useState('');
  const [grupo, setGrupo] = useState('');
  

  const guardarJugador = async () => {
    if (!nombre || !grupo) {
      Alert.alert("Campos obligatorios", "Por favor completa todos los campos.");
      return;
    }

    try {
      await addDoc(collection(db, "jugadores"), {
        nombre: nombre.trim(),
        grupo: grupo.trim(),
        
      });
      Alert.alert("Éxito", "Jugador agregado correctamente.");
      setNombre('');
      setGrupo('');
      navigation.goBack(); // vuelve a la pantalla anterior (opcional)
    } catch (error) {
      console.error("Error al agregar jugador:", error);
      Alert.alert("Error", "No se pudo agregar el jugador.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Agregar Jugador</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Grupo"
        value={grupo}
        onChangeText={setGrupo}
      />
      
      <Button title="Guardar Jugador" onPress={guardarJugador} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, padding: 20, backgroundColor: '#fff'
  },
  titulo: {
    fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15
  }
});
