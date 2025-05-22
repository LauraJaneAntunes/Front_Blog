import React, { useEffect, useState } from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useFonts as useIrishFonts, IrishGrover_400Regular } from '@expo-google-fonts/irish-grover';
import { useFonts as useMontserratFonts, Montserrat_400Regular } from '@expo-google-fonts/montserrat';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

const LoadingScreen = () => {
  const [dots, setDots] = useState('');
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [irishLoaded] = useIrishFonts({ IrishGrover_400Regular });
  const [montserratLoaded] = useMontserratFonts({ Montserrat_400Regular });

  // Animação dos pontinhos
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => (prevDots.length >= 3 ? '' : prevDots + '.'));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  // Checar token e navegar
  useEffect(() => {
    const checkTokenAndNavigate = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        navigation.reset({
          index: 0,
          routes: [{ name: token ? 'Home' : 'Login' }],
        });
      } catch (error) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        });
      }
    };

    // Dá um tempo pra animação rodar antes de navegar
    const timeout = setTimeout(checkTokenAndNavigate, 2000);

    return () => clearTimeout(timeout);
  }, [navigation]);

  if (!irishLoaded || !montserratLoaded) {
    return (
      <View style={styles.container}>
        <Text style={styles.quoteText}>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.titleText}>M{dots}</Text>
        <Text style={styles.quoteText}>Conteúdo que inspira</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  titleText: {
    fontSize: 160,
    fontFamily: 'IrishGrover_400Regular',
    color: '#FFF',
    marginBottom: 0,
    lineHeight: 120,
  },
  quoteText: {
    fontSize: 16,
    color: '#FFF',
    textAlign: 'center',
    fontFamily: 'Montserrat_400Regular',
  },
});

export default LoadingScreen;