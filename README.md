# 🎯 Site de Quizzes

Um site de **quizzes interativos** desenvolvido para testar conhecimentos de forma divertida e competitiva. O projeto conta com sistema de autenticação, pontuação por quiz, ranking de usuários e diferentes modos de jogo.

---

## 🚀 Funcionalidades

* ✅ Autenticação de usuários (Login / Cadastro)
* 🧠 Quizzes com perguntas e respostas
* 🏆 Sistema de pontuação por quiz
* 📊 Ranking global de usuários
* 🔒 Acesso a modos de jogo apenas para usuários logados
* 🔄 Botão de voltar inteligente (mantém a navegação correta)
* ⏳ Loading durante carregamento de dados
* 📱 Design responsivo

---

## 🕹️ Modos de Jogo

* **X1** – Modo competitivo individual
* **Quizzes clássicos** – Responda perguntas e acumule pontos

---

## 🛠️ Tecnologias Utilizadas

* **React**
* **React Router DOM**
* **Firebase Authentication**
* **Firebase Firestore**
* **Tailwind CSS**
* **Lucide Icons**

---

## 📂 Estrutura do Projeto

```bash
src/
 ├── assets/           # Imagens e ícones
 ├── components/       # Componentes reutilizáveis
 ├── context/          # Context API (Auth, User, etc)
 ├── pages/            # Páginas do site
 ├── routes/           # Rotas protegidas
 ├── firebase/         # Configuração do Firebase
 └── App.jsx
```

---

## 🔐 Rotas Protegidas

Algumas páginas exigem autenticação. Caso o usuário não esteja logado:

* 🔁 É redirecionado automaticamente
* 🚫 Não consegue acessar modos restritos

---

## 🧮 Sistema de Pontuação

* Cada quiz possui sua própria pontuação
* Os pontos são salvos no **Firestore**
* O ranking é atualizado em tempo real

---

## 📱 Responsividade

O layout foi desenvolvido utilizando **Tailwind CSS**, garantindo compatibilidade com:

* Desktop
* Tablet
* Mobile

---

## ▶️ Como Rodar o Projeto Localmente

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/seu-repositorio

# Entre na pasta
cd seu-repositorio

# Instale as dependências
npm install

# Rode o projeto
npm run dev
```

---

## 🔧 Configuração do Firebase

1. Crie um projeto no Firebase
2. Ative:

   * Authentication
   * Firestore Database
3. Crie um arquivo `firebaseConfig.js` e adicione suas credenciais

---

## 📌 Melhorias Futuras

* 🔔 Sistema de notificações
* 🎨 Temas claro/escuro
* 🧩 Novos modos de jogo
* 🧠 Banco de perguntas dinâmico

---

## 👨‍💻 Autor

Desenvolvido por **Vinicios Silva** 🚀

---

## 📄 Licença

Este projeto é de uso livre para estudos e aprendizado.
