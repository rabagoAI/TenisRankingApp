import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Button } from 'react-native';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { useFocusEffect } from '@react-navigation/native';

export default function RankingScreen({ navigation }) {
    const [jugadores, setJugadores] = useState([]);
    const [loading, setLoading] = useState(true);

    useFocusEffect(
        React.useCallback(() => {
            setLoading(true);
            const cargarJugadores = async () => {
                try {
                    const q = query(collection(db, "jugadores"), orderBy("puntos", "desc"));
                    const querySnapshot = await getDocs(q);

                    const lista = querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));

                    setJugadores(lista);
                } catch (error) {
                    console.error("Error al cargar jugadores:", error);
                } finally {
                    setLoading(false);
                }
            };

            cargarJugadores();
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
            <Text style={styles.titulo}>Ranking de Jugadores</Text>
            <FlatList
                data={jugadores}
                keyExtractor={item => item.id}
                renderItem={({ item, index }) => (
                    <View style={styles.card}>
                        <Text style={styles.nombre}>{index + 1}. {item.nombre}</Text>
                        <Text style={styles.nivel}>Nivel: {item.nivel}</Text>
                        <Text style={styles.puntos}>Puntos: {item.puntos}</Text>
                    </View>
                )}
            />
            <Button
                title="Agregar nuevo jugador"
                onPress={() => navigation.navigate('AgregarJugador')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff'
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center'
    },
    card: {
        backgroundColor: '#f2f2f2',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10
    },
    nombre: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    nivel: {
        fontSize: 14,
        color: '#555'
    },
    puntos: {
        fontSize: 16,
        fontWeight: '600',
        color: '#007AFF'
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

