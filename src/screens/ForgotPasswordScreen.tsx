//src\screens\ForgotPassword.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Formik } from 'formik';
import { forgotPasswordValidationSchema } from '../validations/authValidation';
import Input from '../components/Input';
import Button from '../components/Button';

export default function ForgotPasswordScreen({ navigation }: any) {
   
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#181818" />
        </TouchableOpacity>
        <Text style={styles.title}>Esqueci a senha</Text>
      </View>
      <Text style={styles.paragraph}>
        Sem problemas! Informe seu email e enviaremos um link para redefinir sua senha.
      </Text>

      <Formik
        initialValues={{ email: '', password: '', confirmPassword: '' }}
        validationSchema={forgotPasswordValidationSchema}
        onSubmit={values => console.log('Recuperar senha para:', values)}
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
              placeholder="Nova senha"
              value={values.password}
              onChangeText={handleChange('password')}
              secureTextEntry
              error={touched.password && errors.password ? errors.password : undefined}
            />

            <Input
              placeholder="Confirmar nova senha"
              value={values.password}
              onChangeText={handleChange('confirmPassword')}
              secureTextEntry
              error={touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword : undefined}
            />
            <Button title="Alterar" onPress={handleSubmit as any} />
            
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
  registerText: {
    color: '#181818',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
  },
});