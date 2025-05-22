import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Header from '../components/Header';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { formatDate } from '../utils/formatDate';
import ArticleImage from '../components/ArticleImage';

const screenWidth = Dimensions.get('window').width - 30;

const ArticleScreen = ({ navigation, route }: any) => {

  const { articleId } = route.params || {};

  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchArticles = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/artigos`);
      setArticles(response.data);
    } catch (error) {
      console.error('Erro ao buscar artigos:', error);
      Alert.alert('Erro', 'Não foi possível carregar os artigos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const displayArticles = articleId
    ? articles.filter((article) => article.id === articleId)
    : articles;

  const handlePress = (article: any) => {
    navigation.navigate('ArticleDetails', { article });
  };
  
  const getExcerpt = (content: string, length = 120) => {
    if (!content) return '';
    return content.length > length
      ? content.substring(0, length).trim() + '...'
      : content;
  };

  const renderItem = ({ item }: { item: any }) => (
  <TouchableOpacity style={styles.card} onPress={() => handlePress(item)}>

    <View style={styles.imageContainer}>
      <Image
        source={{
          uri: item.imagem || 'https://picsum.photos/600/400',
        }}
        style={styles.articleImage}
        resizeMode="cover"
      />
    </View>

    <View style={styles.authorInfoContainer}>
    <Image
      source={{
        uri: item.autor.fotoPerfil || 'https://i.pravatar.cc/150?img=65',
      }}
      style={styles.authorImage}
      resizeMode="cover"
    />
    <Text style={styles.authorDate}>
      Por {item.autor.nome} - {formatDate(item.publicadoEm)} 
    </Text>
    <TouchableOpacity style={styles.heartIconContainer}>
      <AntDesign name="heart" size={16} color="#ff4444" />
    </TouchableOpacity>
    </View>
    <Text style={styles.title}>{item.titulo}</Text>
    <Text style={styles.excerpt}>{getExcerpt(item.conteudo)}</Text>
  </TouchableOpacity>
);

  return (
    <View style={styles.container}>
      <Header />
      {displayArticles.length === 0 ? (
        <Text style={{ color: '#fff', textAlign: 'center', marginTop: 20 }}>
          Nenhum artigo encontrado.
        </Text>
      ) : (
        <FlatList
          data={displayArticles}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 15 }}
        />
      )}
    </View>
  );
};

export default ArticleScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 24,
  },
  authorInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    marginTop: 5,
  },
  imageContainer: {
    backgroundColor: '#181818',
    borderRadius: 16,
    marginBottom: 10,
    alignItems: 'center',
  },
  articleImage: {
    width: 335,
    height: 224,
    borderRadius: 16,
  },
  authorImageWrapper: {
    marginTop: 8,
    borderRadius: 15,
    overflow: 'hidden',
  },
  authorImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 8,
  },
  authorDate: {
    fontSize: 14,
    color: '#000',
    flex: 1,
  },
  heartIconContainer: {
    padding: 5,
  },
  heartIcon: {
    fontSize: 20,
    color: 'red',
  },
  excerpt: {
    fontSize: 16,
    color: '#000',
  },
});