import React, { useEffect, useState } from 'react';
import {View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, FlatList, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { formatDate } from '../utils/formatDate';
import Header from '../components/Header';
import { AntDesign } from '@expo/vector-icons';

const NewsItem = ({ article, onPress }: any) => {
  return (
    <TouchableOpacity onPress={() => onPress(article.id)} style={styles.newsItem}>
      <Text style={styles.newsTitle}>{article.title}</Text>
      <Text style={styles.newsExcerpt}>{article.excerpt}</Text>
    </TouchableOpacity>
  );
};

const CarouselItem = ({ article, number }: any) => {
  return (
    <TouchableOpacity style={styles.carouselItem}>
      <Image
        source={{ uri: article.imagem || 'https://picsum.photos/600/400' }}
        style={styles.carouselImage}
      />
      <Text style={styles.carouselDescription} numberOfLines={3}>
        {article.titulo}
      </Text>
      <View style={styles.carouselNumber}>
        <Text style={styles.carouselNumberText}>{number}</Text>
      </View>
      <View style={styles.footerCarousel}>
          <AntDesign name="heart" size={16} color="#ff4444" />
          <Text style={styles.likesCount}>16</Text>
          <Text style={styles.carouselDate}>{formatDate(article.publicadoEm)}</Text>
        </View>
      

    </TouchableOpacity>
  );
};

const HomeScreen = ({ navigation }: any) => {  
  const [featuredArticle, setFeaturedArticle] = useState<any>(null);
  const [otherArticles, setOtherArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [carouselArticles, setCarouselArticles] = useState<any[]>([]);

  const handleArticlePress = (id: string) => {
    navigation.navigate('Articles', { articleId: id });
  };
  const getExcerpt = (content: string, length = 100) => {
    if (!content) return '';
    return content.length > length ? content.substring(0, length) + '...' : content;
  };

  const fetchArticles = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/artigos`);
      const articles = response.data;

      if (articles.length > 0) {
        const [first, ...rest] = articles;
        setFeaturedArticle(first);
        setOtherArticles(rest.slice(0, 4));

        const lastArticles = [...articles].reverse().slice(0, 4);
        setCarouselArticles(lastArticles);
      }
    } catch (error) {
      console.error('Erro ao buscar artigo em destaque:', error);
      Alert.alert('Erro', 'Não foi possível carregar o artigo em destaque.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);  

  return (
    <>
      <View style={styles.container}>
        <Header />
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.content}>
            {loading ? (
              <ActivityIndicator size="large" color="#181818" />
            ) : featuredArticle ? (
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => handleArticlePress(featuredArticle.id)}
                style={styles.card}
              >
                <Image
                  source={{
                    uri:
                      featuredArticle.imagem ||
                      'https://picsum.photos/600/400',
                  }}
                  style={styles.image}
                  resizeMode="cover"
                />
                <View style={styles.textContainer}>
                  <Text style={styles.title}>{featuredArticle.titulo}</Text>
                  <Text style={styles.authorDate}>
                    Por {featuredArticle.autor.nome} -{' '}
                    {formatDate(featuredArticle.publicadoEm)}
                  </Text>
                </View>
              </TouchableOpacity>
            ) : (
              <Text style={{ color: '#181818' }}>Nenhum artigo encontrado.</Text>
            )}
          </View>

          {/* News */}
          <View style={[styles.section, { backgroundColor: '#181818', borderRadius: 8, padding: 15 }]}>
            <Text style={styles.sectionNewTitle}>New</Text>
            {otherArticles.map((article) => (
              <NewsItem
                key={article.id}
                article={{
                  id: article.id,
                  title: article.titulo,
                  excerpt: getExcerpt(article.conteudo, 80),                }}
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
              data={carouselArticles}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 15,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
  },
  image: {
    width: 335,
    height: 220,
    borderRadius: 16,
  },
  textContainer: {
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#181818',
    marginBottom: 6,
  },
  authorDate: {
    color: '#181818',
    marginBottom: 8,
    fontSize: 12,
  },
  scrollContent: {
    padding: 15,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  sectionNewTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    fontFamily: 'IrishGrover-Regular',
  },
  newsItem: {
    marginBottom: 15,
  },
  newsTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  excerpt: {
    fontSize: 12,
    color: '#fff',
    marginTop: 8
  },
  newsExcerpt: {
    fontSize: 15,
    color: '#fff',
  },
  carouselItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginRight: 15,
    padding: 10,
    width: 150,
    justifyContent: 'center',
  },
  carouselImage: {
    width: 80,
    height: 60,
    borderRadius: 8,
  },
  carouselNumber: {
    position: 'absolute',
    top: 6,
    right: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  carouselNumberText: {
    color: '#181818',
    fontWeight: 'bold',
    fontSize: 48,
  },
  carouselDescription: {
    color: '#181818',
    marginVertical: 8,
  },
  footerCarousel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  carouselDate: {
    color: '#181818',
    fontSize: 12,
  },
  likeButton: {
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  likesCount: {
    fontSize: 14,
    color: '#000',
  },
});