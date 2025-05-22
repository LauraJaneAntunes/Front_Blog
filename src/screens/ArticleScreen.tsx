import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';

const screenWidth = Dimensions.get('window').width - 30;

const articles = [
  {
    id: '1',
    title: 'Artigo em destaque',
    author: 'Autor Exemplo',
    date: '21/05/2025',
    excerpt: 'Este é um resumo do artigo em destaque na home.',
    content: 'Conteúdo completo do artigo em destaque.',
    image: 'https://picsum.photos/600/400',
  },
  {
    id: '2',
    title: 'Notícia 1',
    author: 'Jornalista 1',
    date: '20/05/2025',
    excerpt: 'Trecho da notícia 1 para mostrar na seção News.',
    content: 'Conteúdo completo da notícia 1',
    image: 'https://picsum.photos/300/200?1',
  },
  {
    id: '3',
    title: 'Notícia 2',
    author: 'Jornalista 2',
    date: '19/05/2025',
    excerpt: 'Trecho da notícia 2 para mostrar na seção News.',
    content: 'Conteúdo completo da notícia 2',
    image: 'https://picsum.photos/300/200?2',
  },
];

const ArticleScreen = ({ navigation, route }:any) => {
  // If a specific article ID is provided, filter to show just that article
  const { articleId } = route.params || {};
  const displayArticles = articleId 
    ? articles.filter(article => article.id === articleId) 
    : articles;

  const handlePress = (article: any) => {
    navigation.navigate('ArticleDetails', { article });
  };

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.card} onPress={() => handlePress(item)}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.authorDate}>
        {item.author} - {item.date}
      </Text>
      <Text style={styles.excerpt}>{item.excerpt}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={displayArticles}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 15 }}
      />
    </View>
  );
};

export default ArticleScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  card: {
    backgroundColor: '#1e1e1e',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  image: {
    width: screenWidth,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  authorDate: {
    fontSize: 14,
    color: '#aaa',
    marginBottom: 5,
  },
  excerpt: {
    fontSize: 16,
    color: '#ddd',
  },
});