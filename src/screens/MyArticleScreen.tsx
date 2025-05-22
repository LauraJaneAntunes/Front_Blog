import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons';

const screenWidth = Dimensions.get('window').width - 30;

type Article = {
  id: string;
  title: string;
  image: string;
  createdAt: string;
  updatedAt: string;
};

const dummyData: Article[] = [
  {
    id: '1',
    title: 'Dominando TypeScript: Por que a Tipagem Estática Está Transformando o Desenvolvimento JavaScript',
    image: 'https://picsum.photos/100/100',
    createdAt: '01/05/2025',
    updatedAt: '15/05/2025',
  },
  {
    id: '2',
    title: 'Dominando TypeScript: Por que a Tipagem Estática Está Transformando o Desenvolvimento JavaScript',
    image: 'https://picsum.photos/101/101',
    createdAt: '20/04/2025',
    updatedAt: '10/05/2025',
  },
  {
    id: '3',
    title: 'Dominando TypeScript: Por que a Tipagem Estática Está Transformando o Desenvolvimento JavaScript',
    image: 'https://picsum.photos/102/102',
    createdAt: '15/04/2025',
    updatedAt: '05/05/2025',
  },
];

export default function MyArticlesScreen() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const openDeleteModal = (article: Article) => {
    setSelectedArticle(article);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedArticle(null);
  };

  const deleteArticle = (id: string) => {
    console.log('Excluir artigo:', id);
    // implementar lógica real de exclusão
    closeModal();
  };

  const renderItem = ({ item }: { item: Article }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />

      <View style={styles.infoContainer}>
        <Text style={styles.title}>{item.title}</Text>

        <View style={styles.bottomRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.date}>Criado em: {item.createdAt}</Text>
            <Text style={styles.date}>Alterado em: {item.updatedAt}</Text>
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
         <TouchableOpacity onPress={() => console.log('Editar', item.id)}>
          <Feather name="edit-2" size={20} color="#666" />
         </TouchableOpacity>
        </View>
     </View>
    </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Meus Artigos</Text>

      <FlatList
        data={dummyData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />

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
                <View style={styles.previewInfo}>
                  <Text style={styles.previewTitle}>{selectedArticle.title}</Text>
                  <Text style={styles.previewDate}>
                    Criado em: {selectedArticle.createdAt}
                  </Text>
                  <Text style={styles.previewDate}>
                    Alterado em: {selectedArticle.updatedAt}
                  </Text>
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
                onPress={() => deleteArticle(selectedArticle?.id || '')}
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