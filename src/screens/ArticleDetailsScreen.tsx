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
import Header from 'components/Header';

const screenWidth = Dimensions.get('window').width - 30;

const ArticleDetailsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { article }: any = route.params;

  return (
    <View style={styles.container}>
      <Header />
      
      {/* Back button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>← Voltar</Text>
      </TouchableOpacity>
      
      <ScrollView contentContainerStyle={{ padding: 15 }}>
        <Image source={{ uri: article.image }} style={styles.image} />
        <Text style={styles.title}>{article.title}</Text>
        <Text style={styles.authorDate}>
          {article.author} - {article.date}
        </Text>
        <Text style={styles.content}>{article.content}</Text>
      </ScrollView>
    </View>
  );
};

export default ArticleDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  backButton: {
    padding: 15,
    marginTop: 10,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  image: {
    width: screenWidth,
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  authorDate: {
    fontSize: 14,
    color: '#aaa',
    marginBottom: 15,
  },
  content: {
    fontSize: 16,
    color: '#ddd',
    lineHeight: 24,
  },
});