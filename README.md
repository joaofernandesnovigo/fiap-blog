# Blog Fiap - Trabalho de Frontend

Este projeto foi criado com o Vite, uma ferramenta de build para projetos javascript com o objetivo de acelerar o início do desenvolvimento.\
Foi utilizado o template para react (npm create vite@latest my-blog -- --template react)

Além do Vite e React, o projeto utiliza:
- Node 20.13.1
- React router
- Bootstrap 5.3.3
- Contentful (como base/backend de posts e categorias de blog)
- Contentful rich-text-html-renderer

Para o projeto funcionar é necessário um arquivo com váriáveis de ambiente. Dentre elas temos as configurações para acessar a base do Contentful.\
Necessáro criar na raiz do projeto local o arquivo .env.local.\
Ao menos as variáveis abaixo precisam estar preenchidas, com o id e token do contentful:
- VITE_SPACE_ID
- VITE_ACCESS_TOKEN

Para rodar o projeto:
- npm run dev

Para gerar versão (dist)
- npm run build

