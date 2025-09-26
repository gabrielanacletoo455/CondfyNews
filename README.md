# 📰 CondfyNews

Um fórum de notícias desenvolvido em React Native para estudo e prática das principais funcionalidades do framework.

## 🎯 Sobre o Projeto

O **CondfyNews** é um aplicativo de fórum onde usuários podem postar, visualizar e comentar notícias. O projeto foi desenvolvido com foco no aprendizado do React Native, explorando conceitos como:

- **Navegação e Rotas** - React Navigation com Stack
- **Gerenciamento de Estado** - React Query para cache e sincronização
- **Imagens** - Firebase Storage
- **Estilização** - StyleSheet e componentes reutilizáveis
- **Formulários** - React Hook Form com validação
- **Upload de Imagens** - React Native Image Picker
- **Navegação por Context** - Context API para autenticação

## 🛠️ Tecnologias Utilizadas

- **React Native** 0.81.4
- **React** 19.1.0
- **TypeScript** 5.8.3
- **React Navigation** 7.x (Drawer + Stack)
- **React Query** 5.x (TanStack Query)
- **Firebase** 12.3.0
- **React Hook Form** 7.x
- **Axios** 1.12.2
- **React Native Vector Icons** 10.3.0

## 📱 Funcionalidades

- ✅ **Autenticação** - Login e registro de usuários
- ✅ **Feed de Notícias** - Listagem de posts com paginação
- ✅ **Criação de Posts** - Upload de imagens e texto
- ✅ **Sistema de Comentários** - Interação entre usuários
- ✅ **Perfil do Usuário** - Gerenciamento de dados pessoais
- ✅ **Busca** - Pesquisa por posts e usuários
- ✅ **Navegação** - Navigation com múltiplas telas

## 🚀 Como Executar o Projeto

### Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 20 ou superior)
- **Java Development Kit (JDK)** 11 ou superior
- **Android Studio** com Android SDK
- **React Native CLI** ou **Expo CLI**

### Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/gabrielanacletoo455/CondfyNews
cd condfyNews
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure o Android**
   - Abra o Android Studio
   - Configure o Android SDK
   - Crie um emulador Android ou conecte um dispositivo físico

4. **Execute o projeto**
```bash
# Para Android
npm run android

# Para iOS (apenas no macOS)
npm run ios
```

## 📱 Debug via USB (Wi-Fi)

Para desenvolver sem usar cabo USB, siga estes passos:

### 1. Verificar Dispositivos Conectados
```bash
adb devices
```
Certifique-se de que seu dispositivo aparece na lista.

### 2. Descobrir o IP do Dispositivo
```bash
adb shell ip -f inet addr show wlan0
```
Anote o IP que aparece (exemplo: 192.168.0.105).

### 3. Ativar Modo TCP/IP
```bash
adb tcpip 5555
```

### 4. Conectar via Wi-Fi
```bash
adb connect 192.168.0.105:5555
```
Substitua `192.168.0.105` pelo IP do seu dispositivo.

### 5. Verificar Conexão
```bash
adb devices
```
Você deve ver seu dispositivo listado com o IP.

### 6. Desconectar o Cabo USB
Agora você pode desconectar o cabo e usar apenas Wi-Fi para desenvolvimento.

### 7. Executar o Projeto
```bash
npm run android
```

## ⚠️ Observações Importantes

- **Rede Wi-Fi**: O celular e o PC devem estar na **mesma rede Wi-Fi**
- **Performance**: Conexão Wi-Fi é mais lenta e instável que via USB
- **Reconexão**: Se reiniciar o celular ou trocar de rede, repita o processo
- **Estabilidade**: Para desenvolvimento intensivo, recomenda-se usar cabo USB

## 📁 Estrutura do Projeto

```bash
src/
├── components/ # Componentes reutilizáveis
│ ├── Avatar/
│ ├── CommonButton/
│ ├── Form/
│ └── ...
├── screens/ # Telas da aplicação
│ ├── home/ # Feed de notícias
│ ├── login/ # Autenticação
│ ├── post/ # Visualização de posts
│ └── ...
├── contexts/ # Context API
├── hooks/ # Custom hooks
├── routes/ # Configuração de navegação
├── services/ # Chamadas para API
├── utils/ # Funções utilitárias
└── types/ # Definições TypeScript

```

## 📞 Contato

**Gabriel** - Desenvolvedor Frontend Junior

- 📧 Email: [gabrielanacleto159@gmail.com]
- 💼 LinkedIn: [https://www.linkedin.com/in/gabriel-anacletoo]
- 🐙 GitHub: [https://github.com/gabrielanacletoo455]

---

## 📄 Licença

Este projeto é para fins de estudo e aprendizado. Sinta-se livre para usar como referência para seus próprios projetos!

---