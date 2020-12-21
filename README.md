# Product Hunt Clone

> Clone do sistema do site [Product Hunt](https://www.producthunt.com/) utilizando o framework [NextJS](https://nextjs.org/) e [Firebase](https://firebase.google.com/).

Clone do site Product Hunt para fins didáticos e referência. O sistema contém autenticação de usuário, CRUD e busca em base de dados

## Pré-requisitos

Ter uma instância do [Firebase](https://firebase.google.com/) configurada e a apiKey inserida em firebase/config.js

## Instalação

```bash
git clone https://github.com/felipesvianna/product-hunt-clone
npm install
```

## Utilização

Ambiente de desenvolvimento

```bash
npm run dev
```

Ambiente de produção

```bash
npm run build
npm run start
```

## Pacotes NodeJS utilizados

- next
- firebase
- firebase-admin
- prop-types
- react
- react-dom
- react-firebase-file-uploader
- @emotion/core
- @emotion/styled
- @emotion/babel-preset-css-prop
- babel-plugin-emotion

## Padrões de Desenvolvimento

### Padronização de código

- [Airbnb JavaScript Style](https://github.com/airbnb/javascript)
- [Airbnb React/JSX Style Guide](https://github.com/airbnb/javascript/tree/master/react)
- [ESLint](https://eslint.org/docs/rules/)

### Pacotes de Linting

- eslint
- prettier
- eslint-plugin-prettier
- eslint-config-prettier
- eslint-plugin-node
- eslint-config-node
- eslint-config-airbnb
