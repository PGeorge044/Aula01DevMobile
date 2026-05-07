# 🛍️ E-Commerce App - Aula 06

Uma aplicação React Native/Expo muito elaborada que demonstra conceitos avançados de desenvolvimento mobile, incluindo consumo de API, navegação, estado global, persistência de dados e UI/UX polida.

## ✨ Funcionalidades

### 🏠 **Tela Principal (Produtos)**
- **Grid responsivo** de produtos com 2 colunas
- **Busca em tempo real** com debounce
- **Filtros por categoria** com chips coloridos
- **Pull to refresh** para atualizar dados
- **Scroll infinito** com carregamento paginado
- **Estados de loading e erro** com indicadores visuais
- **Favoritos persistentes** com AsyncStorage

### 🔍 **Tela Explorar**
- **Estatísticas em tempo real** (total de produtos, categorias, itens em estoque)
- **Ordenação avançada** (nome, preço, avaliação, data)
- **Filtros visuais** com categorias coloridas
- **Interface expansível** para opções de ordenação

### ❤️ **Tela Favoritos**
- **Lista personalizada** de produtos favoritados
- **Persistência local** com AsyncStorage
- **Estados vazios** com mensagens amigáveis
- **Navegação direta** para detalhes

### 📱 **Detalhes do Produto**
- **Galeria de imagens** com overlay de status
- **Informações completas** (preço, avaliação, descrição, tags)
- **Badges visuais** (desconto, categoria, estoque)
- **Ações rápidas** (favoritar, compartilhar, adicionar ao carrinho)
- **Layout responsivo** com scroll suave
- **Botões de ação** fixos na parte inferior

## 🛠️ **Tecnologias Utilizadas**

### **Frontend**
- **React Native** com Expo
- **TypeScript** para tipagem forte
- **Expo Router** para navegação baseada em arquivos
- **React Hooks** avançados (useState, useEffect, useCallback, useMemo)
- **AsyncStorage** para persistência local

### **UI/UX**
- **LinearGradient** para efeitos visuais
- **SafeAreaView** para compatibilidade de dispositivos
- **Dimensions API** para layouts responsivos
- **TouchableOpacity** com feedback háptico
- **ActivityIndicator** para estados de loading
- **FlatList** otimizada com numColumns

### **Estado e Dados**
- **Custom Hooks** para lógica reutilizável
- **Context API** implícita através de hooks
- **Mock API** com simulação de latência e erros
- **Debounce** para busca otimizada
- **Pagination** com scroll infinito

## 📁 **Estrutura do Projeto**

```
Aula06/
├── app/
│   ├── _layout.tsx              # Layout principal com navegação
│   ├── index.tsx                # Tela principal (Produtos)
│   ├── favorites.tsx            # Tela de favoritos
│   ├── product/
│   │   └── [id].tsx            # Detalhes do produto (rota dinâmica)
│   └── (tabs)/
│       ├── _layout.tsx         # Layout das tabs
│       ├── index.tsx           # Tab Produtos (redireciona para /)
│       └── explore.tsx         # Tela Explorar
├── components/
│   ├── ProductCard.tsx         # Card reutilizável de produto
│   ├── SearchHeader.tsx        # Header com busca e filtros
│   └── ui/
│       └── Button.tsx          # Componentes UI base (Button, Card, etc.)
├── hooks/
│   └── useApi.ts               # Hooks customizados para API
├── services/
│   └── api.ts                  # Serviço de API mockada
├── types/
│   └── index.ts                # Definições TypeScript
└── constants/
    └── theme.ts                # Cores e temas
```

## 🚀 **Como Executar**

1. **Instalar dependências:**
   ```bash
   cd Aula06
   npm install
   ```

2. **Executar o projeto:**
   ```bash
   npm start
   ```

3. **Escolher plataforma:**
   - Pressione `i` para iOS Simulator
   - Pressione `a` para Android Emulator
   - Pressione `w` para Web

## 🎯 **Conceitos Demonstrados**

### **Navegação Avançada**
- **Rotas dinâmicas** com parâmetros `[id]`
- **Tabs navigation** com ícones customizados
- **Stack navigation** para modais e detalhes
- **Programmatic navigation** com `router.push()`

### **Gerenciamento de Estado**
- **Hooks customizados** para lógica complexa
- **Persistência local** com AsyncStorage
- **Estados assíncronos** (loading, error, success)
- **Memoização** com useMemo e useCallback

### **API e Dados**
- **Mock API** com latência simulada
- **Tratamento de erros** robusto
- **Retry logic** automático
- **Busca e filtros** em tempo real
- **Pagination** infinita

### **UI/UX Avançado**
- **Design system** consistente
- **Dark/Light mode** automático
- **Animações e transições** suaves
- **Feedback visual** para interações
- **Layouts responsivos** para diferentes telas

### **Performance**
- **Virtualização** com FlatList
- **Memoização** de componentes
- **Debounce** para busca
- **Lazy loading** de imagens
- **Bundle splitting** implícito

## 🎨 **Design System**

### **Cores**
- **Tema claro/escuro** automático
- **Paleta consistente** com variáveis
- **Cores semânticas** (sucesso, erro, aviso)
- **Gradientes** para destaques

### **Tipografia**
- **Escala tipográfica** consistente
- **Font weights** apropriados
- **Line heights** otimizados
- **Text alignment** estratégico

### **Espaçamento**
- **Sistema de 4px** para consistência
- **Padding/Margin** padronizados
- **Border radius** para suavidade
- **Shadows** para profundidade

## 🔧 **APIs Utilizadas**

### **React Native APIs**
- `Dimensions` - Layouts responsivos
- `AsyncStorage` - Persistência local
- `Share` - Compartilhamento nativo
- `Alert` - Diálogos nativos

### **Expo APIs**
- `LinearGradient` - Gradientes visuais
- `SafeAreaView` - Áreas seguras
- `StatusBar` - Controle da status bar

### **Expo Router APIs**
- `useRouter` - Navegação programática
- `useLocalSearchParams` - Parâmetros de rota
- `Stack.Screen` - Configuração de telas

## 🧪 **Testes e Debugging**

### **Simulação de Cenários**
- **Erros de rede** (5% de chance)
- **Latência variável** (500-2000ms)
- **Produtos esgotados**
- **Estados de loading** longos

### **Debugging Tools**
- **React DevTools** para componentes
- **Flipper** para network e storage
- **Expo Dev Client** para hot reload
- **Console logs** estratégicos

## 📈 **Possíveis Melhorias**

### **Funcionalidades**
- [ ] Carrinho de compras completo
- [ ] Sistema de autenticação
- [ ] Notificações push
- [ ] Avaliações e comentários
- [ ] Sistema de checkout
- [ ] Histórico de pedidos

### **Performance**
- [ ] Implementar React Query/TanStack Query
- [ ] Adicionar caching inteligente
- [ ] Otimização de imagens
- [ ] Code splitting manual
- [ ] Service Worker para PWA

### **UI/UX**
- [ ] Animações com Reanimated
- [ ] Microinterações
- [ ] Skeleton loading
- [ ] Swipe gestures
- [ ] Pull to refresh customizado

### **Qualidade**
- [ ] Testes unitários e integração
- [ ] TypeScript strict mode
- [ ] Linting avançado
- [ ] Documentação completa
- [ ] CI/CD pipeline

---

**Desenvolvido com ❤️ para demonstrar conceitos avançados de React Native**
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
