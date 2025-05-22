import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Formik } from 'formik';
import { registerValidationSchema } from '../validations/authValidation';
import Input from '../components/Input';
import Button from '../components/Button';
import api from '../services/api';

export default function RegisterScreen({ navigation }: any) {
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleCheckbox = () => setIsChecked(!isChecked);

  const handleRegister = async (values: { name: string; email: string; password: string; confirmPassword: string }) => {
    console.log('Tentando registrar com:', values);
    try {
      setLoading(true);
      const response = await api.post('/users/register', {
        nome: values.name,
        email: values.email,
        senha: values.password,
      });
      console.log('Resposta do backend:', response.data);
      Alert.alert('Sucesso', 'Conta criada com sucesso!');
      navigation.navigate('Login');
    } catch (error: any) {
      console.error('Erro no registro:', error.response || error.message);
      Alert.alert('Erro', error.response?.data?.message || 'Não foi possível criar a conta.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#181818" />
        </TouchableOpacity>
        <Text style={styles.title}>Registrar</Text>
      </View>
      <Text style={styles.paragraph}>
        Crie sua conta para explorar conteúdos incríveis, seguir autores e participar da comunidade.
      </Text>

      <Formik
        initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
        validationSchema={registerValidationSchema}
        onSubmit={handleRegister}
      >
        {({ handleChange, handleSubmit, values, errors, touched }) => (
          <>
            <Input
              placeholder="Nome"
              value={values.name}
              onChangeText={handleChange('name')}
              error={touched.name && errors.name ? errors.name : undefined}
            />

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

            <Input
              placeholder="Confirmar Senha"
              value={values.confirmPassword}
              onChangeText={handleChange('confirmPassword')}
              secureTextEntry
              error={touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword : undefined}
            />

            <Button title={loading ? 'Criando...' : "Criar Conta"} onPress={handleSubmit as any} disabled={!isChecked || loading} />

            <View style={styles.checkboxContainer}>
              <TouchableOpacity onPress={toggleCheckbox} style={styles.checkbox}>
                {isChecked && <View style={styles.checked} />}
              </TouchableOpacity>
              <Text style={styles.checkboxLabel}>
                Li e concordo com os Termos de Uso e a Política de Privacidade.
              </Text>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.registerText}>Já tem cadastro? Clique aqui</Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 40,
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
    fontFamily: 'Montserrat',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 10,
    maxWidth: 280,
  },
  checkbox: {
    width: 16,
    height: 16,
    borderWidth: 1,
    borderColor: '#9E9E9E',
    borderRadius: 4,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    width: 14,
    height: 14,
    backgroundColor: '#181818',
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#181818',
    fontFamily: 'Montserrat',
  },
  registerText: {
    color: '#181818',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
  },
});