Inicio do projeto

Estrutura

/src
│
├── assets/                 # Imagens, ícones, fontes etc.
│
├── components/             # Componentes reutilizáveis
│   ├── ArticleCard.tsx
│   ├── ArticleImage.tsx
│   ├── Input.tsx
│   ├── Button.tsx
│   ├── Header.tsx
│   └── ModalConfirm.tsx
│
├── screens/                # Telas principais do app
│   ├── Auth/
│   │   ├── LoginScreen.tsx
│   │   ├── RegisterScreen.tsx
│   │   └── ForgotPasswordScreen.tsx
│   ├── HomeScreen.tsx
│   ├── ArticlesScreen.tsx
│   ├── ArticleScreen.tsx
│   ├── ProfileScreen.tsx
│   ├── SettingsScreen.tsx
│   ├── MyArticlesScreen.tsx
│   ├── NewArticleScreen.tsx
│   └── EditArticleScreen.tsx
│
├── routes/                 # Rotas e navegação
│   └── index.tsx           # Navegação com React Navigation
│
├── services/               # Comunicação com backend (API)
│   ├── api.ts              # Axios ou fetch setup
│   ├── authService.ts
│   └── articleService.ts
│
├── context/                # Contexto global (Auth, Theme etc.)
│   ├── AuthContext.tsx
│   └── ThemeContext.tsx (opcional)
│
├── utils/                  # Utilitários e helpers
│   ├── validators.ts
│   └── formatDate.ts
│
├── theme/                  # Cores, fontes, estilos globais
│   └── index.ts
│
├── types/                  # Tipagens globais TypeScript
│   └── index.ts
│
└── App.tsx                 # Entry point
