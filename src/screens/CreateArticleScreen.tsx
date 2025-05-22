import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import Header from '../components/Header';
import Input from '../components/Input';
import Button from '../components/Button';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreateArticle = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'CreateArticle'>>();
  const navigation = useNavigation();
  const article = route.params?.article;

  const [banner, setBanner] = useState('');
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  useEffect(() => {
    if (article) {
      setBanner(article.imagemDestacada || '');
      setTitle(article.titulo || '');
      setText(article.conteudo || '');
    }
  }, [article]);

  const handleSave = async () => {
  if (!banner || !title || !text) {
    alert('Por favor, preencha todos os campos.');
    return;
  }

  try {
    const token = await AsyncStorage.getItem('userToken');
    if (!token) {
      alert('Usuário não autenticado. Faça login novamente.');
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    if (article) {
      await axios.put(`${API_BASE_URL}/artigos/${article.id}`, {
        titulo: title,
        conteudo: text,
        imagemDestacada: banner,
      }, config);
      alert('Artigo atualizado com sucesso!');
    } else {
      await axios.post(`${API_BASE_URL}/artigos`, {
        titulo: title,
        conteudo: text,
        imagemDestacada: banner,
      }, config);
      alert('Artigo criado com sucesso!');
    }
    navigation.goBack();
  } catch (error: any) {
    const message = error.response?.data?.message || error.message || 'Erro ao salvar artigo';
    alert(`Erro: ${message}`);
  }
};

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.pageTitle}>{article ? 'Editar Artigo' : 'Criar Artigo'}</Text>

        {/* Banner */}
        <View style={styles.bannerContainer}>
          <Image
            source={{ uri: banner || 'https://via.placeholder.com/100x100?text=+' }}
            style={styles.bannerImage}
          />
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Input
              label="Banner"
              value={banner}
              onChangeText={setBanner}
              placeholder="Adicione uma imagem"
            />
          </View>
        </View>

        {/* Título */}
        <Input
          label="Título"
          value={title}
          onChangeText={setTitle}
          placeholder="Adicione um título"
        />

        {/* Texto */}
        <Input
          label="Texto"
          value={text}
          onChangeText={setText}
          placeholder="Escreva seu artigo"
          multiline
          style={{ height: 200, textAlignVertical: 'top' }}
        />

        {/* Botão de salvar */}
        <Button title={article ? 'Salvar Alterações' : 'Salvar'} onPress={handleSave} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 16,
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#181818',
    marginBottom: 20,
  },
  bannerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  bannerImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    backgroundColor: '#eee',
  },
});

export default CreateArticle; 