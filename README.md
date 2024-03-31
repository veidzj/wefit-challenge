# WeFit Challenge

## Clone o repositório
```bash
git clone https://github.com/seu-usuario/wefit-challenge.git
cd wefit-challenge
```

## Rodando localmente

### npm
```bash
npm install
npm run build
npm start // Subir o servidor
npm run debug // Subir em modo debug
npm run test ou npm t // Rodar todos os testes
npm run test:ci // Rodar todos os testes com coverage
```

### yarn
```bash
yarn install
yarn run build
yarn start // Subir o servidor
yarn run debug // Subir em modo debug
yarn run test // Rodar todos os testes
yarn run test:ci // Rodar todos os testes com coverage
```

Seja bem vindo ao teste de backend da Wefit.

### Para iniciar o banco de dados é necessario ter o docker-compose instalado em sua máquina e rodar o seguinte comando:

    docker-compose up -D

o docker-compose vai criar um container de um MySQL e você poderá acessar via localhost:3306 e a senha do usuário **root** é **senha_root_123**

### Para iniciar o servidor express basta executar o seguinte comando:

    npm start
    ou
    yarn start

Depois que concluir seu teste não de enviar o seu código junto a pasta data, nela está salvo o volume do MySQL criado pelo docker.

Boa sorte =)

## Rodando com Docker

### npm
```bash
npm run up // Subir containers
npm run down // Parar containers
```

### yarn
```bash
yarn run up // Subir containers
yarn run down // Parar containers
```

### Docker
```bash
docker-compose up -d // Subir containers
docker-compose down // Parar containers
```
