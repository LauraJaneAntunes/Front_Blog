// App.tsx
import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { RootStackParamList } from './src/types';

import LoadingScreen from './src/screens/LoadingScreen';
import LoginScreen from './src/screens/LoginScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import HomeScreen from './src/screens/HomeScreen';
import ArticleScreen from './src/screens/ArticleScreen';
import ArticleDetailsScreen from './src/screens/ArticleDetailsScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import MyArticlesScreen from './src/screens/MyArticleScreen';
import CreateArticleScreen from './src/screens/CreateArticleScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator();

// Drawer navigator com as telas internas
function DrawerNavigator() {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="MyArticles" component={MyArticlesScreen} />
      <Stack.Screen name="CreateArticle" component={CreateArticleScreen} />
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
          <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>

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