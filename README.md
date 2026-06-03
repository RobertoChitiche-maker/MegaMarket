# MegaMarket / RobertoMarket

Plataforma web de venda de aparelhos eletrônicos, desenvolvida com **React + Vite** no frontend, **Node.js + Express** no backend, **Prisma ORM** e **PostgreSQL/NeonDB** como base de dados.

O sistema permite que clientes visualizem produtos, criem conta, façam login, adicionem produtos ao carrinho, finalizem compras e acompanhem o estado dos seus pedidos. Também possui um painel administrativo para gestão de produtos, stock, clientes e pedidos.

---

## 1. Funcionalidades principais

### Cliente

- Criar conta;
- Fazer login;
- Visualizar produtos eletrônicos;
- Pesquisar produtos por nome ou categoria;
- Adicionar produtos ao carrinho;
- Aumentar ou diminuir quantidade no carrinho;
- Remover produtos do carrinho;
- Finalizar compra informando o local de entrega;
- Acompanhar o estado da compra em **Meus Pedidos**.

### Administrador

- Fazer login como administrador;
- Acessar o painel administrativo;
- Cadastrar produtos;
- Visualizar produtos cadastrados;
- Eliminar produtos;
- Consultar stock;
- Visualizar clientes cadastrados;
- Visualizar pedidos dos clientes;
- Alterar o estado dos pedidos;
- Consultar estatísticas gerais da loja.

---

## 2. Tecnologias utilizadas

| Camada | Tecnologia |
|---|---|
| Frontend | React + Vite |
| Estilização | CSS |
| Backend | Node.js + Express |
| Base de dados | PostgreSQL / NeonDB |
| ORM | Prisma |
| Autenticação | JWT |
| Criptografia de senha | bcryptjs |
| Testes da API | Thunder Client |
| Versionamento | GitHub |
| Hospedagem Backend | Render |
| Hospedagem Frontend | Vercel |

---

## 3. Estrutura do projeto

```txt
MegaMarket
│
├── backend
│   ├── prisma
│   │   └── schema.prisma
│   ├── src
│   │   ├── controllers
│   │   ├── routes
│   │   ├── middlewares
│   │   ├── prismaClient.js
│   │   └── server.js
│   ├── package.json
│   └── .env
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   ├── App.jsx
│   │   └── index.css
│   ├── package.json
│   └── .env
│
└── README.md