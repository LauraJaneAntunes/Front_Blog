import React from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Header from '../components/Header';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width - 30;

// Tipo para os artigos
type Article = {
  id: string;
  title: string;
  author: string;
  date: string;
  excerpt: string;
  content: string;
  image: string;
  description?: string;
};

// Dados simulados
const featuredArticle: Article = {
  id: '1',
  title: 'Artigo em destaque',
  author: 'Autor Exemplo',
  date: '21/05/2025',
  excerpt: 'Este é um resumo do artigo em destaque na home.',
  content: 'Conteúdo completo do artigo em destaque.',
  image: 'https://picsum.photos/600/400',
};

const newsArticles: Article[] = [
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

const topVotedArticles: Article[] = [
  {
    id: '4',
    title: 'Mais votado 1',
    author: 'Autor A',
    date: '18/05/2025',
    excerpt: '',
    content: '',
    image: 'https://picsum.photos/80/60?3',
    description: 'Descrição rápida do artigo mais votado 1',
  },
  {
    id: '5',
    title: 'Mais votado 2',
    author: 'Autor B',
    date: '17/05/2025',
    excerpt: '',
    content: '',
    image: 'https://picsum.photos/80/60?4',
    description: 'Descrição rápida do artigo mais votado 2',
  },
];

// Componente do card de artigo
const ArticleCard = ({
  article,
  imageSize,
  onPress,
}: {
  article: Article;
  imageSize: 'small' | 'medium' | 'large';
  onPress?: (id: string) => void;
}) => {
  
    const sizes = {
      small: { width: 80, height: 60 },
      medium: { width: screenWidth, height: 200 },
      large: { width: screenWidth, height: 300 },
    };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onPress && onPress(article.id)}
      style={styles.articleCard}
    >
      <Image
        source={{ uri: article.image }}
        style={[styles.articleImage, sizes[imageSize]]}
        resizeMode="cover"
      />
      <Text style={styles.articleTitle}>{article.title}</Text>
      <Text style={styles.articleAuthorDate}>
        {article.author} - {article.date}
      </Text>
      {article.excerpt ? (
        <Text style={styles.articleExcerpt}>{article.excerpt}</Text>
      ) : null}
    </TouchableOpacity>
  );
};

// Componente para itens de notícias (News)
const NewsItem = ({
  article,
  onPress,
}: {
  article: Article;
  onPress?: (id: string) => void;
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onPress && onPress(article.id)}
      style={styles.newsItem}
    >
      <Text style={styles.newsTitle}>{article.title}</Text>
      <Text style={styles.newsExcerpt}>{article.excerpt}</Text>
    </TouchableOpacity>
  );
};

// Componente do carousel de mais votados
const CarouselItem = ({
  article,
  number,
}: {
  article: Article;
  number: number;
}) => {
  return (
    <View style={styles.carouselItem}>
      <View style={{ position: 'relative' }}>
        <Image
          source={{ uri: article.image }}
          style={styles.carouselImage}
          resizeMode="cover"
        />
        <View style={styles.carouselNumber}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>#{number}</Text>
        </View>
      </View>
      <Text style={styles.carouselDescription}>{article.description}</Text>
      <View style={styles.carouselFooter}>
        <Text style={{ fontSize: 18 }}>❤️</Text>
        <Text style={styles.carouselDate}>{article.date}</Text>
      </View>
    </View>
  );
};

// Tela Home
const HomeScreen = ({ navigation }: any) => {
  const userImage = 'https://cdn-icons-png.flaticon.com/512/616/616408.png';
  

  const handleArticlePress = (id: string) => {
    navigation.navigate('Articles', { articleId: id });
  };

  return (
    <>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        <Header userImage={userImage} />
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Artigo em destaque */}
          <View style={styles.section}>
            <ArticleCard
              article={featuredArticle}
              imageSize="large"
              onPress={handleArticlePress}
            />
          </View>

          {/* Notícia */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>New</Text>
            {newsArticles.map((article) => (
              <NewsItem
                key={article.id}
                article={article}
                onPress={handleArticlePress}
              />
            ))}
          </View>

          {/* Carousel mais votados */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Mais votados</Text>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={topVotedArticles}
              keyExtractor={(item) => item.id}
              renderItem={({ item, index }) => (
                <CarouselItem article={item} number={index + 1} />
              )}
              contentContainerStyle={{ paddingHorizontal: 10 }}
            />
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default HomeScreen;

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  scrollContent: {
    padding: 15,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  articleCard: {
    backgroundColor: '#1e1e1e',
    borderRadius: 10,
    padding: 10,
  },
  articleImage: {
    borderRadius: 10,
    marginBottom: 10,
  },
  articleTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  articleAuthorDate: {
    fontSize: 14,
    color: '#aaa',
    marginBottom: 5,
  },
  articleExcerpt: {
    fontSize: 16,
    color: '#ddd',
  },
  newsItem: {
    marginBottom: 15,
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  newsExcerpt: {
    fontSize: 15,
    color: '#ccc',
  },
  carouselItem: {
    backgroundColor: '#1e1e1e',
    borderRadius: 10,
    marginRight: 15,
    padding: 10,
    width: 150,
  },
  carouselImage: {
    width: 80,
    height: 60,
    borderRadius: 8,
  },
  carouselNumber: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  carouselDescription: {
    color: '#ddd',
    marginVertical: 8,
  },
  carouselFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  carouselDate: {
    color: '#aaa',
    fontSize: 12,
  },
});
