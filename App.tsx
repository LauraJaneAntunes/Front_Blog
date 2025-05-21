// App.tsx
import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { RootStackParamList } from './src/types/navigation';

import LoadingScreen from './src/screens/LoadingScreen';
import LoginScreen from './src/screens/LoginScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import HomeScreen from './src/screens/HomeScreen';
import ArticleScreen from './src/screens/ArticleScreen';
import ArticleDetailsScreen from './src/screens/ArticleDetailsScreen';


// import Perfil from './src/screens/Perfil';
// import Artigos from './src/screens/Artigos';
// import CriarArtigo from './src/screens/CriarArtigo';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator();

// Drawer navigator com as telas internas
function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="Home" component={HomeScreen} />
      {/* <Drawer.Screen name="Perfil" component={Perfil} />
      <Drawer.Screen name="Meus Artigo" component={Artigos} />
      <Drawer.Screen name="Criar Novo Artigo" component={CriarArtigo} /> */}
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar 
        translucent
        backgroundColor="transparent"
        barStyle="light-content" 
      />
      <NavigationContainer>
              <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>

        {/* <Stack.Navigator initialRouteName="Loading" screenOptions={{ headerShown: false }}> */}
          <Stack.Screen name="Loading" component={LoadingScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Home" component={DrawerNavigator} />
          <Stack.Screen name="Articles" component={ArticleScreen} />
          <Stack.Screen name="ArticleDetails" component={ArticleDetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}