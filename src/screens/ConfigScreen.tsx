import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Modal, 
  Dimensions 
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { deleteToken } from '../services/storage';

import { useFonts } from 'expo-font';

const { width, height } = Dimensions.get('window');

const ConfigScreen = ({ visible, onClose }: { visible: boolean; onClose: () => void }) => {
  const navigation = useNavigation<any>();

  const [fontsLoaded] = useFonts({
    'IrishGrover-Regular': require('../../assets/fonts/IrishGrover-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null; // ou algum loader
  }

  const handleNavigateToProfile = () => {
    navigation.navigate('Profile');
    onClose();
  };

  const handleNavigateToMyArticles = () => {
    navigation.navigate('MyArticles');
    onClose();
  };

  const handleNavigateToCreateArticle = () => {
    navigation.navigate('CreateArticle');
    onClose();
  };

  const handleLogout = async () => {
    await deleteToken();
    navigation.navigate('Login');
    onClose();
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.container}>
        <View style={styles.menuContainer}>
          <View style={styles.header}>
            <Text style={styles.logo}>M.</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.menuItems}>
            <TouchableOpacity style={styles.menuItem} onPress={handleNavigateToProfile}>
              <Text style={styles.menuItemText}>Perfil</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={handleNavigateToMyArticles}>
              <Text style={styles.menuItemText}>Meus Artigos</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={handleNavigateToCreateArticle}>
              <Text style={styles.menuItemText}>Criar novo Artigo</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Sair</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  menuContainer: {
    width: width * 0.8,
    height: '100%',
    backgroundColor: '#fff',
    position: 'absolute',
    right: 0,
    paddingVertical: 20,
    paddingHorizontal: 15,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    fontFamily: 'IrishGrover-Regular',
    fontSize: 24,
    color: '#000',
  },
  closeButton: {
    padding: 5,
  },
  closeButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  menuItems: {
    flex: 1,
    marginBottom: 20,
  },
  menuItem: {
    paddingVertical: 15,
    alignItems: 'flex-end',
  },
  menuItemText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'right',
  },
  logoutButton: {
    paddingVertical: 15,
    alignItems: 'flex-end',
  },
  logoutText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'right',
  },
});

export default ConfigScreen;