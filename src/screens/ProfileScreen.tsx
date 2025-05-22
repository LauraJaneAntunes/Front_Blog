import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, ScrollView, Alert } from 'react-native';
import Header from '../components/Header';
import Input from '../components/Input';
import Button from '../components/Button';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { getToken } from '../services/storage';

export default function ProfileScreen() {
  const { user, updateUser } = useAuth();

  const [avatar, setAvatar] = useState('');
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [loading, setLoading] = useState(false);

  function splitName(fullName: string) {
    const parts = fullName.trim().split(' ');
    const nome = parts.shift() || '';
    const sobrenome = parts.join(' ') || '';
    return { nome, sobrenome };
  }

  // Inicializar estados com dados do contexto
  useEffect(() => {
    if (user) {
      setAvatar(user.avatar || '');
      setEmail(user.email || '');
      // Separa o nome completo em nome e sobrenome para exibição
      if (user.nome) {
        const { nome: nomeSeparado, sobrenome: sobrenomeSeparado } = splitName(user.nome);
        setNome(nomeSeparado);
        setSobrenome(sobrenomeSeparado);
      }
    }
  }, [user]);

  // Carrega dados atualizados do perfil via API
  useEffect(() => {
    async function loadProfile() {
      try {
        const token = await getToken();
        if (!token) return;

        const response = await axios.get(`${API_BASE_URL}/users/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const userData = response.data;
        
        // Se a API retorna nome completo, separa em nome e sobrenome
        if (userData.nome && !userData.sobrenome) {
          const { nome: nomeSeparado, sobrenome: sobrenomeSeparado } = splitName(userData.nome);
          setNome(nomeSeparado);
          setSobrenome(sobrenomeSeparado);
        } else {
          setNome(userData.nome || '');
          setSobrenome(userData.sobrenome || '');
        }

        setAvatar(userData.avatar || '');
        setEmail(userData.email || '');

        // Atualiza o contexto com os dados mais recentes
        updateUser({
          nome: userData.nome || '',
          email: userData.email || '',
          avatar: userData.avatar || '',
        });
      } catch (error) {
        console.log('Erro ao carregar perfil:', error);
        // Mantém os dados do contexto se a API falhar
      }
    }

    loadProfile();
  }, []);

  const userImage = avatar || 'https://cdn-icons-png.flaticon.com/512/616/616408.png';

  const handleSalvar = async () => {
    // Validações
    if (!nome.trim()) {
      Alert.alert('Erro', 'Nome é obrigatório');
      return;
    }

    if (!email.trim()) {
      Alert.alert('Erro', 'Email é obrigatório');
      return;
    }

    if (senha && senha !== confirmarSenha) {
      Alert.alert('Erro', 'Senha e confirmação não coincidem!');
      return;
    }

    if (senha && senha.length < 6) {
      Alert.alert('Erro', 'Senha deve ter pelo menos 6 caracteres');
      return;
    }

    setLoading(true);

    try {
      const token = await getToken();
      if (!token) {
        Alert.alert('Erro', 'Você precisa estar logado para atualizar seu perfil.');
        return;
      }

      const nomeCompleto = `${nome.trim()} ${sobrenome.trim()}`.trim();

      // Prepara dados para envio - só inclui senha se foi informada
      const dataToSend: {
        nome: string;
        email: string;
        avatar: string;
        senha?: string;
      } = {
        nome: nomeCompleto,
        email: email.trim(),
        avatar: avatar.trim(),
      };

      if (senha && senha.trim()) {
        dataToSend.senha = senha;
      }

      const response = await axios.put(
        `${API_BASE_URL}/users/profile`,
        dataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Atualiza o contexto com os dados retornados pela API
      const updatedUserData = {
        nome: nome.trim(),
        email: email.trim(),
        avatar: avatar.trim(),
      };

      await updateUser(updatedUserData);

      Alert.alert(
        'Sucesso', 
        `Perfil atualizado com sucesso!\nNome: ${nomeCompleto}\nEmail: ${email}`
      );

      // Limpa os campos de senha após salvar
      setSenha('');
      setConfirmarSenha('');

    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      let errorMessage = 'Erro desconhecido';
      if (typeof error === 'object' && error !== null) {
        if ('response' in error && typeof (error as any).response === 'object' && (error as any).response !== null) {
          errorMessage = (error as any).response.data?.message || (error as any).message || 'Erro desconhecido';
        } else if ('message' in error) {
          errorMessage = (error as any).message || 'Erro desconhecido';
        }
      }
      Alert.alert('Erro', `Erro ao atualizar perfil: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Header userImage={userImage} />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Avatar */}
        <View style={styles.avatarSection}>
          <Image source={{ uri: userImage }} style={styles.avatar} />
          <View style={styles.avatarInfo}>
            <Input
              label="Avatar"
              value={avatar}
              onChangeText={setAvatar}
              placeholder="URL da sua imagem"
            />
          </View>
        </View>

        {/* Formulário */}
        <Input
          label="Nome *"
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
          label="Email *"
          value={email}
          onChangeText={setEmail}
          placeholder="Digite seu email"
          keyboardType="email-address"
        />

        <Input
          label="Nova Senha"
          value={senha}
          onChangeText={setSenha}
          placeholder="Digite uma nova senha (opcional)"
          secureTextEntry
        />

        <Input
          label="Confirmar Nova Senha"
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
          placeholder="Confirme a nova senha"
          secureTextEntry
        />

        {/* Botão */}
        <Button 
          title={loading ? "Salvando..." : "Salvar"} 
          onPress={handleSalvar}
          disabled={loading}
        />
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