# 📱 Frontend - Blog App

Este é o frontend de um aplicativo de blog desenvolvido com  **React Native** com **Expo.**

O app permite que usuários criem, visualizem e gerenciem artigos, além de acessar funcionalidades como autenticação e perfil.

---

## 🚀 Tecnologias Utilizadas

* **React Native** (Expo versão atual SDK 53)
* **TypeScript**
* **React Navigation**
* **Axios**
* **Formik + Yup** (Formulários e Validação)
* **Async Storage** (Armazenamento local)
* **JWT Decode** (Decodificação de tokens)
* **React Native Reanimated & Gesture Handler** (Animações e gestos)
* **Google Fonts via Expo**

---

## 📂 Estrutura de Pastas

FRONT/
├── .expo/                     # Arquivos e configurações específicas do Expo
├── assets/                    # Ativos estáticos como imagens e fontes
│   ├── fonts/                 # Diretório para arquivos de fontes
│   ├── adaptive-icon.png      # Ícone adaptativo do aplicativo
│   ├── favicon.png            # Favicon do aplicativo
│   ├── icon.png               # Ícone padrão do aplicativo
│   └── splash-icon.png        # Imagem da tela de splash
├── node_modules/              # Módulos Node.js instalados (dependências)
├── src/                       # Diretório principal do código fonte
│   ├── components/            # Componentes de UI reutilizáveis
│   │   ├── ArticleCard.tsx    # Componente de card de artigo
│   │   ├── ArticleImage.tsx   # Componente de imagem de artigo
│   │   ├── Button.tsx         # Componente de botão
│   │   ├── Header.tsx         # Componente de cabeçalho
│   │   └── Input.tsx          # Componente de campo de entrada
│   ├── config/                # Configurações gerais da aplicação
│   │   └── index.ts           # Arquivo de índice para configurações
│   ├── contexts/              # Provedores da API de Contexto do React
│   │   └── AuthContext.tsx    # Contexto de autenticação
│   ├── screens/               # Telas/páginas individuais da aplicação
│   │   ├── ArticleDetailsScreen.tsx # Tela de detalhes do artigo
│   │   ├── ArticleScreen.tsx        # Tela de listagem de artigos
│   │   ├── ConfigScreen.tsx         # Tela de configurações
│   │   ├── CreateArticleScreen.tsx  # Tela de criação de artigo
│   │   ├── ForgotPasswordScreen.tsx # Tela de recuperação de senha
│   │   ├── HomeScreen.tsx           # Tela inicial
│   │   ├── LoadingScreen.tsx        # Tela de carregamento
│   │   ├── LoginScreen.tsx          # Tela de login
│   │   ├── MyArticlesScreen.tsx     # Tela de meus artigos
│   │   ├── ProfileScreen.tsx        # Tela de perfil
│   │   └── RegisterScreen.tsx       # Tela de registro
│   ├── services/              # Integrações de API e serviços externos
│   │   ├── api.ts             # Funções para chamadas de API
│   │   └── storage.ts         # Funções para manipulação de armazenamento local
│   ├── types/                 # Definições de tipo TypeScript
│   │   └── index.ts           # Arquivo de índice para tipos
│   ├── utils/                 # Funções utilitárias
│   │   └── formatDate.tsx     # Função para formatar datas
│   └── validations/           # Lógica de validação de entrada
│       └── authValidation.ts  # Validação de autenticação
├── .gitignore                 # Especifica arquivos intencionalmente não rastreados para ignorar
├── app.json                   # Manifesto da aplicação Expo
├── App.tsx                    # Componente principal da aplicação
├── babel.config.js            # Configuração do Babel
├── index.ts                   # Ponto de entrada da aplicação
├── package-lock.json          # Registra as versões exatas das dependências
├── package.json               # Metadados e dependências do projeto
├── README.md                  # Arquivo README do projeto
└── tsconfig.json              # Configuração do TypeScript

---

## 🔧 Funcionalidades

* ✅ Autenticação (login, registro, recuperação de senha)
* ✅ Criação e edição de artigos
* ✅ Visualização de lista e detalhes de artigos
* ✅ Gerenciamento de artigos próprios
* ✅ Tela de perfil
* ✅ Validação de formulários
* ✅ Armazenamento seguro de token (JWT) no dispositivo
* ✅ Layout responsivo e navegação fluida

---

## ▶️ Como Executar Localmente

### 1. Clone este repositório

git clone https://github.com/LauraJaneAntunes/Front_Blog.git

### 2. Instale as dependências

npm install

### 3. Execute o projeto

npx expo start

**Observação:** É necessário ter o aplicativo **Expo Go** instalado no seu dispositivo ou utilizar um emulador configurado.

---

## 🔗 Backend

Este frontend consome a API desenvolvida no backend. Confira o repositório correspondente [aqui](https://github.com/LauraJaneAntunes/Back_Blog) (substituir pelo link real).

---

## ✅ Requisitos

* **Node.js** >= 18
* **Expo CLI** instalado globalmente

<pre class="overflow-visible!" data-start="3080" data-end="3115"><div class="contain-inline-size rounded-md border-[0.5px] border-token-border-medium relative bg-token-sidebar-surface-primary"><div class="flex items-center text-token-text-secondary px-4 py-2 text-xs font-sans justify-between h-9 bg-token-sidebar-surface-primary dark:bg-token-main-surface-secondary select-none rounded-t-[5px]">bash</div><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-sidebar-surface-primary text-token-text-secondary dark:bg-token-main-surface-secondary flex items-center rounded-sm px-2 font-sans text-xs"><button class="flex gap-1 items-center select-none px-4 py-1" aria-label="Copiar"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-xs"><path fill-rule="evenodd" clip-rule="evenodd" d="M7 5C7 3.34315 8.34315 2 10 2H19C20.6569 2 22 3.34315 22 5V14C22 15.6569 20.6569 17 19 17H17V19C17 20.6569 15.6569 22 14 22H5C3.34315 22 2 20.6569 2 19V10C2 8.34315 3.34315 7 5 7H7V5ZM9 7H14C15.6569 7 17 8.34315 17 10V15H19C19.5523 15 20 14.5523 20 14V5C20 4.44772 19.5523 4 19 4H10C9.44772 4 9 4.44772 9 5V7ZM5 9C4.44772 9 4 9.44772 4 10V19C4 19.5523 4.44772 20 5 20H14C14.5523 20 15 19.5523 15 19V10C15 9.44772 14.5523 9 14 9H5Z" fill="currentColor"></path></svg>Copiar</button><span class="" data-state="closed"><button class="flex items-center gap-1 px-4 py-1 select-none"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-xs"><path d="M2.5 5.5C4.3 5.2 5.2 4 5.5 2.5C5.8 4 6.7 5.2 8.5 5.5C6.7 5.8 5.8 7 5.5 8.5C5.2 7 4.3 5.8 2.5 5.5Z" fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M5.66282 16.5231L5.18413 19.3952C5.12203 19.7678 5.09098 19.9541 5.14876 20.0888C5.19933 20.2067 5.29328 20.3007 5.41118 20.3512C5.54589 20.409 5.73218 20.378 6.10476 20.3159L8.97693 19.8372C9.72813 19.712 10.1037 19.6494 10.4542 19.521C10.7652 19.407 11.0608 19.2549 11.3343 19.068C11.6425 18.8575 11.9118 18.5882 12.4503 18.0497L20 10.5C21.3807 9.11929 21.3807 6.88071 20 5.5C18.6193 4.11929 16.3807 4.11929 15 5.5L7.45026 13.0497C6.91175 13.5882 6.6425 13.8575 6.43197 14.1657C6.24513 14.4392 6.09299 14.7348 5.97903 15.0458C5.85062 15.3963 5.78802 15.7719 5.66282 16.5231Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M14.5 7L18.5 11" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>Editar</button></span></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-bash"><span><span>npm install -g expo-cli
</span></span></code></div></div></pre>

* Dispositivo físico com **Expo Go** ou emulador configurado.

---

## 📜 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE]() para mais detalhes.
