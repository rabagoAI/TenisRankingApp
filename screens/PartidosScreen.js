import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import { useFocusEffect } from "@react-navigation/native";
import { deleteDoc, doc } from 'firebase/firestore';
import { Alert } from 'react-native';

export default function PartidosScreen() {
  const [partidos, setPartidos] = useState([]);
  const [loading, setLoading] = useState(true);

  const confirmarEliminacion = (id) => {
  Alert.alert(
    'Confirmar eliminación',
    '¿Estás seguro de que quieres eliminar este partido?',
    [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: () => eliminarPartido(id),
      },
    ]
  );
};

const eliminarPartido = async (id) => {
  try {
    await deleteDoc(doc(db, 'partidos', id));
    setPartidos(partidos.filter((p) => p.id !== id));
  } catch (error) {
    console.error('Error al eliminar partido:', error);
    Alert.alert('Error', 'No se pudo eliminar el partido.');
  }
};

  useFocusEffect(
    React.useCallback(() => {
      const cargarPartidos = async () => {
        try {
          setLoading(true);
          const q = query(collection(db, "partidos"), orderBy("fecha", "desc"));
          const snapshot = await getDocs(q);

          const lista = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setPartidos(lista);
        } catch (error) {
          console.error("Error al cargar partidos:", error);
        } finally {
          setLoading(false);
        }
      };

      cargarPartidos();
    }, [])
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>📅 Historial de Partidos</Text>
      <FlatList
        data={partidos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.texto}>
              <Text style={styles.label}>Jugador 1:</Text> {item.jugador1}
            </Text>
            <Text style={styles.texto}>
              <Text style={styles.label}>Jugador 2:</Text> {item.jugador2}
            </Text>
            <Text style={styles.texto}>
              <Text style={styles.label}>Ganador:</Text> {item.ganador}
            </Text>
            <Text style={styles.texto}>
              <Text style={styles.label}>Resultado:</Text> {item.resultado}
            </Text>
            <Text style={styles.texto}>
              <Text style={styles.label}>Fecha:</Text>{" "}
              {item.fecha && item.fecha.toDate
                ? item.fecha.toDate().toLocaleDateString()
                : "Sin fecha"}
            </Text>

            {/* Botón para eliminar */}
            <Text
              style={styles.eliminar}
              onPress={() => confirmarEliminacion(item.id)}
            >
              🗑️ Eliminar
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  texto: {
    fontSize: 16,
    marginBottom: 4,
  },
  label: {
    fontWeight: "bold",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  eliminar: {
  marginTop: 10,
  color: 'red',
  textAlign: 'right',
  fontWeight: 'bold',
}
});
