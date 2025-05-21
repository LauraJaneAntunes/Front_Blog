import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Header from '../components/Header';
import Input from '../components/Input';
import Button from '../components/Button';

export default function ProfileScreen() {
  const [avatar, setAvatar] = useState('imagem-deperfil123.png');
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const userImage = 'https://cdn-icons-png.flaticon.com/512/616/616408.png';

  const handleSalvar = () => {
    // Aqui você pode colocar a lógica para salvar os dados
    console.log({ avatar, nome, sobrenome, email, senha, confirmarSenha });
  };

  return (
    <View style={styles.container}>
      <Header userImage={userImage} />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Avatar */}
        <View style={styles.avatarSection}>
          <Image 
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/616/616408.png' }} 
            style={styles.avatar} 
          />
          <View style={styles.avatarInfo}>
            <Input 
              label="Avatar"
              value={avatar}
              onChangeText={setAvatar}
              placeholder="Selecione sua imagem"
            />
          </View>
        </View>

        {/* Formulário */}
        <Input 
          label="Nome"
          value={nome}
          onChangeText={setNome}
          placeholder="Digite seu nome"
        />

        <Input 
          label="Sobrenome"
          value={sobrenome}
          onChangeText={setSobrenome}
          placeholder="Digite seu sobrenome"
        />

        {/* Linha divisória */}
        <View style={styles.divider} />

        <Input 
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="Digite seu email"
          keyboardType="email-address"
        />

        <Input 
          label="Senha"
          value={senha}
          onChangeText={setSenha}
          placeholder="Digite sua senha"
          secureTextEntry
        />

        <Input 
          label="Confirmar Senha"
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
          placeholder="Confirme sua senha"
          secureTextEntry
        />

        {/* Botão */}
        <Button title="Salvar" onPress={handleSalvar} />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  avatarSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#181818',
  },
  avatarInfo: {
    flex: 1,
    marginLeft: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 16,
  },
});
