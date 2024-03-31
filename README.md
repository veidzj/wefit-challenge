# WeFit Challenge

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=veidzj_wefit-challenge&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=veidzj_wefit-challenge)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=veidzj_wefit-challenge&metric=bugs)](https://sonarcloud.io/summary/new_code?id=veidzj_wefit-challenge)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=veidzj_wefit-challenge&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=veidzj_wefit-challenge)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=veidzj_wefit-challenge&metric=coverage)](https://sonarcloud.io/summary/new_code?id=veidzj_wefit-challenge)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=veidzj_wefit-challenge&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=veidzj_wefit-challenge)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=veidzj_wefit-challenge&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=veidzj_wefit-challenge)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=veidzj_wefit-challenge&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=veidzj_wefit-challenge)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=veidzj_wefit-challenge&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=veidzj_wefit-challenge)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=veidzj_wefit-challenge&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=veidzj_wefit-challenge)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=veidzj_wefit-challenge&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=veidzj_wefit-challenge)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=veidzj_wefit-challenge&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=veidzj_wefit-challenge)

[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-%23FE5196?logo=conventionalcommits&logoColor=white)](https://conventionalcommits.org)
[![Code Style](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

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
