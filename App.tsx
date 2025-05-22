import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './src/types';
import { AuthProvider } from './src/contexts/AuthContext';

import LoadingScreen from './src/screens/LoadingScreen';
import LoginScreen from './src/screens/LoginScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import CreateArticle from './src/screens/CreateArticleScreen';
import ArticlesScreen from './src/screens/ArticleScreen';
import ArticleDetailsScreen from './src/screens/ArticleDetailsScreen';
import MyArticles from './src/screens/MyArticlesScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {

return (
    <AuthProvider>
      <>
        <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Loading" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Loading" component={LoadingScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Articles" component={ArticlesScreen} />
            <Stack.Screen name="ArticleDetails" component={ArticleDetailsScreen} />
            <Stack.Screen name="MyArticles" component={MyArticles} />
            <Stack.Screen name="CreateArticle" component={CreateArticle} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </>
    </AuthProvider>
  );
}
