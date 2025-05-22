import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Header from '../components/Header'; // Ajuste o caminho conforme seu projeto
import { formatDate } from '../utils/formatDate';

const screenWidth = Dimensions.get('window').width - 30;

const ArticleDetailsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { article }: any = route.params;

  if (!article) {
    return (
      <View style={[styles.container, {justifyContent: 'center', alignItems: 'center'}]}>
        <Text>Nenhum artigo para mostrar.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header />
      
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>← Voltar</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={{ padding: 15 }}>
        <Image
          source={{ uri: article.imagem || 'https://picsum.photos/600/400' }}
          style={styles.image}
          resizeMode="cover"
        />
        
        <Text style={styles.title}>{article.titulo}</Text>

        <View style={styles.authorInfoContainer}>
          <Image
            source={{ uri: article.autor?.fotoPerfil || 'https://i.pravatar.cc/150?img=65' }}
            style={styles.authorImage}
            resizeMode="cover"
          />
          <Text style={styles.authorDate}>
            Por {article.autor?.nome || 'Desconhecido'} - {formatDate(article.publicadoEm)}
          </Text>
        </View>

        <Text style={styles.content}>{article.conteudo}</Text>
      </ScrollView>
    </View>
  );
};

export default ArticleDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // branco igual ArticleScreen
  },
  backButton: {
    padding: 15,
    marginTop: 10,
  },
  backButtonText: {
    color: '#000',
    fontSize: 16,
  },
  image: {
    width: screenWidth,
    height: 224,
    borderRadius: 16,
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  authorInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  authorImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 8,
  },
  authorDate: {
    fontSize: 14,
    color: '#444',
  },
  content: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
});
