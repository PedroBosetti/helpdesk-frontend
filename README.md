# Helpdesk Frontend

Frontend da aplicação de Helpdesk desenvolvido com React, Vite e TailwindCSS.

## 🚀 Tecnologias

- **React 19** - Biblioteca para construção de interfaces
- **Vite** - Build tool e dev server
- **React Router DOM** - Gerenciamento de rotas
- **Axios** - Cliente HTTP para requisições à API
- **TailwindCSS** - Framework CSS utilitário
- **Lucide React** - Biblioteca de ícones

## 📋 Funcionalidades

- ✅ Autenticação de usuários (Login e Cadastro)
- ✅ Dashboard de chamados
- ✅ Criar novos chamados
- ✅ Editar chamados existentes
- ✅ Deletar chamados
- ✅ Visualizar todos os chamados do usuário
- ✅ Filtros por prioridade e status
- ✅ Interface moderna e responsiva

## 🔧 Instalação

1. Instale as dependências:
```bash
npm install
```

2. Certifique-se de que o backend está rodando na porta 3000

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

4. Acesse a aplicação em `http://localhost:5173`

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── ChamadoCard.jsx
│   ├── ChamadoModal.jsx
│   └── PrivateRoute.jsx
├── contexts/           # Contextos React
│   └── AuthContext.jsx
├── pages/             # Páginas da aplicação
│   ├── Login.jsx
│   ├── Cadastro.jsx
│   └── Dashboard.jsx
├── services/          # Serviços de API
│   ├── api.js
│   ├── auth.js
│   └── chamados.js
├── App.jsx           # Componente principal com rotas
└── main.jsx         # Ponto de entrada da aplicação
```

## 🔐 Autenticação

A aplicação utiliza JWT (JSON Web Token) para autenticação. O token é armazenado no localStorage e enviado automaticamente em todas as requisições através de um interceptor do Axios.

## 🎨 Interface

A interface foi desenvolvida com TailwindCSS, oferecendo:
- Design moderno e limpo
- Responsividade para diferentes tamanhos de tela
- Feedback visual para ações do usuário
- Cores e badges para status e prioridades

## 📝 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria a build de produção
- `npm run preview` - Visualiza a build de produção localmente
- `npm run lint` - Executa o linter

## 🔗 Integração com Backend

O frontend se comunica com o backend através da API REST rodando em `http://localhost:3000`. As rotas disponíveis são:

- `POST /usuario/cadastrar` - Cadastro de usuário
- `POST /usuario/login` - Login de usuário
- `GET /chamado/listar` - Listar todos os chamados
- `GET /chamado/listar/:id` - Listar chamado específico
- `POST /chamado/criar` - Criar novo chamado
- `PUT /chamado/editar/:id` - Editar chamado
- `DELETE /chamado/deletar/:id` - Deletar chamado
