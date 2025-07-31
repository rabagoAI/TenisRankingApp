import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, Button } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { useFocusEffect } from '@react-navigation/native';

export default function RankingScreen({ navigation }) {
    const [jugadoresPorGrupo, setJugadoresPorGrupo] = useState({});
    const [loading, setLoading] = useState(true);

    useFocusEffect(
        React.useCallback(() => {
            const cargarJugadores = async () => {
                try {
                    setLoading(true);
                    const snapshot = await getDocs(collection(db, "jugadores"));
                    const lista = snapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));

                    // Agrupar por grupo
                    const grupos = {};
                    for (let i = 1; i <= 5; i++) {
                        grupos[i] = lista
                            .filter(j => j.grupo === i)
                            .sort((a, b) => (b.puntos || 0) - (a.puntos || 0));
                    }

                    setJugadoresPorGrupo(grupos);
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
        <ScrollView style={styles.container}>
            <Text style={styles.titulo}>Ranking por Grupos</Text>

            {Object.entries(jugadoresPorGrupo).map(([grupo, jugadores]) => (
                <View key={grupo} style={styles.grupoContainer}>
                    <Text style={styles.grupoTitulo}>Grupo {grupo}</Text>
                    {jugadores.length === 0 ? (
                        <Text style={styles.sinJugadores}>Sin jugadores en este grupo</Text>
                    ) : (
                        jugadores.map((j, index) => (
                            <View key={j.id} style={styles.card}>
                                <Text style={styles.nombre}>
                                    {index + 1}. {j.nombre}
                                </Text>
                                
                                <Text style={styles.puntos}>Puntos: {j.puntos || 0}</Text>
                            </View>
                        ))
                    )}
                </View>
            ))}

            <Button
                title="Agregar nuevo jugador"
                onPress={() => navigation.navigate('AgregarJugador')}
            />
        </ScrollView>
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
    grupoContainer: {
        marginBottom: 30
    },
    grupoTitulo: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#007AFF'
    },
    sinJugadores: {
        fontStyle: 'italic',
        color: '#888'
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

