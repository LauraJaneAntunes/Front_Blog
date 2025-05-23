import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';

import ConfigScreen from '../screens/ConfigScreen';

// Defina a imagem do usuário diretamente aqui
const userImage = 'https://cdn-icons-png.flaticon.com/512/616/616408.png';

const Header: React.FC = () => {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const [configVisible, setConfigVisible] = useState(false);

  const openConfigMenu = () => {
    setConfigVisible(true);
  };

  const closeConfigMenu = () => {
    setConfigVisible(false);
  };

  return (
    <>
      <SafeAreaView style={[styles.container, { paddingTop: insets.top, height: 60 + insets.top }]}>
        {/* Links */}
        <View style={styles.linksContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Text style={styles.link}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Articles')}>
            <Text style={styles.link}>Artigos</Text>
          </TouchableOpacity>
        </View>

        {/* Avatar com botão */}
        <TouchableOpacity onPress={openConfigMenu}>
          <View>
            <Image source={{ uri: userImage }} style={styles.avatar} />
            <View style={styles.plusIconContainer}>
              <AntDesign name="pluscircle" size={16} color="#181818" />
            </View>
          </View>
        </TouchableOpacity>
      </SafeAreaView>

      {/* Modal */}
      <ConfigScreen visible={configVisible} onClose={closeConfigMenu} />
    </>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 2 },
  },
  linksContainer: {
    flexDirection: 'row',
    gap: 30,
  },
  link: {
    color: '#181818',
    fontSize: 16,
    fontWeight: '500',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 100,
  },
  plusIconContainer: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: '#fff',
    borderRadius: 100,
  },
});