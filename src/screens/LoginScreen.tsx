// src/screens/LoginScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Formik } from 'formik';
import { loginValidationSchema } from '../validations/authValidation';
import Input from '../components/Input';
import Button from '../components/Button'
import api from '../services/api';

export default function LoginScreen({ navigation }: any) {

  const handleLogin = async (values: { email: string; password: string }) => {
    try {
      const response = await api.post('/auth/login', {
        email: values.email,
        password: values.password,
      });

      const { token, user } = response.data;

      // 👉 Aqui você pode salvar o token no AsyncStorage, SecureStore ou Context
      console.log('Token:', token);
      console.log('User:', user);

      // Navegar para a tela Home
      navigation.navigate('Home');
    } catch (error: any) {
      console.log(error);
      Alert.alert(
        'Erro no login',
        error?.response?.data?.message || 'Ocorreu um erro. Verifique seus dados e tente novamente.'
      );
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo de volta!</Text>
      <Text style={styles.paragraph}>
        Acesse sua conta para acompanhar artigos exclusivos, favoritar e muito mais.
      </Text>

      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={loginValidationSchema}
        onSubmit={values => {
          console.log(values);
          navigation.navigate('Home');
        }}
      >
        {({ handleChange, handleSubmit, values, errors, touched }) => (
          <>
            <Input
              placeholder="Email"
              value={values.email}
              onChangeText={handleChange('email')}
              error={touched.email && errors.email ? errors.email : undefined}
              keyboardType="email-address"
            />

            <Input
              placeholder="Senha"
              value={values.password}
              onChangeText={handleChange('password')}
              secureTextEntry
              error={touched.password && errors.password ? errors.password : undefined}
            />

            <View style={styles.forgotContainer}>
              <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                <Text style={styles.forgotText}>Esqueceu a senha?</Text>
              </TouchableOpacity>
            </View>

            <Button title="Login" onPress={handleSubmit as any} />

            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.registerText}>Novo usuário? Clique aqui</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#181818',
  },
  paragraph: {
    fontSize: 14,
    lineHeight: 20,
    color: '#1B1B1B',
    marginBottom: 80,
    fontFamily: 'Montserrat'
  },
  forgotContainer: {
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  forgotText: {
    color: '#181818',
    fontSize: 14,
  },
  registerText: {
    color: '#181818',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
  },
});