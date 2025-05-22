import React, { useEffect, useState } from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useFonts as useIrishFonts, IrishGrover_400Regular } from '@expo-google-fonts/irish-grover';
import { useFonts as useMontserratFonts, Montserrat_400Regular } from '@expo-google-fonts/montserrat';

const { width } = Dimensions.get('window');

const LoadingScreen = () => {
  const [dots, setDots] = useState('');
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [irishLoaded] = useIrishFonts({ IrishGrover_400Regular });
  const [montserratLoaded] = useMontserratFonts({ Montserrat_400Regular });

  // Efeito de animação dos pontinhos
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => (prevDots.length >= 3 ? '' : prevDots + '.'));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  // Redireciona para tela de login após 3s
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    }, 3000);

    return () => clearTimeout(timeout);
  }, [navigation]);

  // Caso as fontes não estejam carregadas, exibe uma mensagem de carregamento
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