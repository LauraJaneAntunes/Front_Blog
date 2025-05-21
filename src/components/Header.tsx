import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type HeaderProps = {
  userImage: string;
};

const Header: React.FC<HeaderProps> = ({ userImage }) => {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top, height: 60 + insets.top }]}>
      {/* Links */}
      <View style={styles.linksContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={styles.link}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Articles')}>
          <Text style={styles.link}>Artigo</Text>
        </TouchableOpacity>
      </View>

      {/* Foto do usuário que abre o Drawer */}
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Image 
          source={{ uri: userImage }} 
          style={styles.avatar} 
        />
      </TouchableOpacity>
    </SafeAreaView>
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
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 2 },
  },
  linksContainer: {
    flexDirection: 'row',
    gap: 16,
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
});