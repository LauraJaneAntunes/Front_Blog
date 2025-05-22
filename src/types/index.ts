//src\types\index.tsx
export type RootStackParamList = {
  Loading: undefined;
  Login: undefined;
  Home: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  Articles: undefined;
  ArticleDetails: { article: any };
  MyArticles: undefined;
  CreateArticle: { article?: any };
  Profile: undefined;
  Config: undefined;
};