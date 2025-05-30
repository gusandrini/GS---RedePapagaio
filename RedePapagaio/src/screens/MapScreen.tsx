import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Tipagem da navegação
type RootStackParamList = {
  OngDetail: { id: string; nome: string; cidade: string };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'OngDetail'>;

interface Ong {
  id: string;
  nome: string;
  latitude: number;
  longitude: number;
  cidade: string;
}

const mockOngs: Ong[] = [
  {
    id: '1',
    nome: 'ONG Vida Plena',
    latitude: -23.55052,
    longitude: -46.633308,
    cidade: 'São Paulo',
  },
  {
    id: '2',
    nome: 'Ajuda RJ',
    latitude: -22.9068,
    longitude: -43.1729,
    cidade: 'Rio de Janeiro',
  },
  {
    id: '3',
    nome: 'Solidariedade BH',
    latitude: -19.9167,
    longitude: -43.9345,
    cidade: 'Belo Horizonte',
  },
];

export default function MapScreen() {
  const [region, setRegion] = useState<Region | null>(null);
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão negada', 'Permissão para acessar localização foi negada.');
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      });
    })();
  }, []);

  if (!region) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={region} showsUserLocation>
        {mockOngs.map((ong) => (
          <Marker
            key={ong.id}
            coordinate={{ latitude: ong.latitude, longitude: ong.longitude }}
            title={ong.nome}
            description={ong.cidade}
            onCalloutPress={() =>
              navigation.navigate('OngDetail', {
                id: ong.id,
                nome: ong.nome,
                cidade: ong.cidade,
              })
            }
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
