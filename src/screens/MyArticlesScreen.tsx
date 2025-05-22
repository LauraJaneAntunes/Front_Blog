import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import { AntDesign, Feather } from '@expo/vector-icons';
import {getToken} from '../services/storage';
import Header from '../components/Header';

const screenWidth = Dimensions.get('window').width - 30;

type Article = {
  id: number;
  titulo: string;
  imagemDestacada: string;
  criadoEm: string;
  atualizadoEm: string;
};

export default function MyArticlesScreen({navigation}: any) {

  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://192.168.0.100:3000/api/artigos');
      const fetchedArticles = response.data.map((artigo: any) => ({
        id: artigo.id,
        titulo: artigo.titulo,
        imagemDestacada: artigo.imagemDestacada || 'https://picsum.photos/100/100',
        criadoEm: new Date(artigo.publicadoEm).toLocaleDateString('pt-BR'),
        atualizadoEm: new Date(artigo.atualizadoEm || artigo.publicadoEm).toLocaleDateString('pt-BR'),
      }));
      setArticles(fetchedArticles);
    } catch (error) {
      console.error('Erro ao buscar artigos:', error);
    } finally {
      setLoading(false);
    }
  };

  const openDeleteModal = (article: Article) => {
    setSelectedArticle(article);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedArticle(null);
  };

  const deleteArticle = async (id: number) => {
    const token = await getToken();
    try {

    await axios.delete(`http://192.168.0.100:3000/api/artigos/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
      closeModal();
      // Atualiza lista após deletar
      setArticles(prev => prev.filter(article => article.id !== id));
    } catch (error) {
      console.error('Erro ao deletar artigo:', error);
    }
  };

  const renderItem = ({ item }: { item: Article }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.imagemDestacada }} style={styles.image} />

      <View style={styles.infoContainer}>
        <Text style={styles.title}>{item.titulo}</Text>

        <View style={styles.bottomRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.date}>Criado em: {item.criadoEm}</Text>
            <Text style={styles.date}>Alterado em: {item.atualizadoEm}</Text>
          </View>
        </View>

        <View style={styles.actionsRow}>
          <View style={styles.likesContainer}>
            <TouchableOpacity style={styles.likeButton}>
              <AntDesign name="heart" size={16} color="#ff4444" />
            </TouchableOpacity>
            <Text style={styles.likesCount}>16</Text>
          </View>

          <View style={styles.actions}>
            <TouchableOpacity onPress={() => openDeleteModal(item)}>
              <Feather name="trash-2" size={20} color="#ff4444" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('CreateArticle', { article: item })}>
              <Feather name="edit-2" size={20} color="#666" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  const userImage = 'https://cdn-icons-png.flaticon.com/512/616/616408.png';

  return (
    <View style={styles.container}>
      <Header userImage={userImage} />
      <Text style={styles.screenTitle}>Meus Artigos</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <FlatList
          data={articles}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Modal de exclusão */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Excluir Artigo?</Text>

            {selectedArticle && (
              <View style={styles.articlePreview}>
                <Image source={{ uri: selectedArticle.imagemDestacada }} style={styles.previewImage} />
                <View style={styles.previewInfo}>
                  <Text style={styles.previewTitle}>{selectedArticle.titulo}</Text>
                  <Text style={styles.previewDate}>Criado em: {selectedArticle.criadoEm}</Text>
                  <Text style={styles.previewDate}>Alterado em: {selectedArticle.atualizadoEm}</Text>
                </View>
              </View>
            )}

            <Text style={styles.warningText}>
              Tem certeza de que deseja excluir este artigo? Esta ação não poderá ser desfeita.
            </Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={closeModal}
                activeOpacity={0.8}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteArticle(selectedArticle?.id || 0)}
                activeOpacity={0.8}
              >
                <Text style={styles.deleteButtonText}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 18,
    lineHeight: 22,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  date: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  likesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
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
    color: '#666',
    fontWeight: '500',
  },
  actions: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 16,
  },
  articlePreview: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  previewImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
  },
  previewInfo: {
    flex: 1,
  },
  previewTitle: {
    fontWeight: '600',
    fontSize: 14,
    color: '#000',
    marginBottom: 4,
    lineHeight: 18,
  },
  previewDate: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  warningText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 24,
    lineHeight: 20,
  },
  modalButtons: {
    gap: 12,
  },
  cancelButton: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#181818',
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#181818',
    fontSize: 16,
    fontWeight: '500',
  },
  deleteButton: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 16,
    backgroundColor: '#ff4444',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});