Frontend
========

- Single-page app com autenticação & CRUD. 
- Projeto ilustrativo para entrevista de emprego Frontend. 
- O projeto foi desenvolvido com HTML, [Material UI](https://material-ui.com/) para interface visual do usuário, [React](https://reactjs.org/) para estrutura lógica do app, e [Webpack](https://webpack.js.org/) para bundler das bibliotecas e deploy da versão de produção.
- O projeto fez uso da API oferecida pela [REQ|RES](https://reqres.in/) para consumir fake data no app. 

### Para acessar

- Link online para acessar o app: [Frontend-React](https://frontend-sample-react.herokuapp.com/).

### Instalação

Para instalação é necessário ter instalado os seguintes programas:
```
Node.js >= 8.10
Npm >= 3.5.2
(Opcional) git
```

Próximo passo:

```
# No terminal

git clone git://github.com/pedrogglima/frontend-sample-react

# Ou no github clique na opção "Clone or Download"

# Após o download do repositorio, instalar as dependencias do projeto.
# Vá para o diretório frontend-sample-react e digite no terminal:

npm install

# Após instalar, digite

npm run postbuild

# então inicialize o servidor

npm run start:server:exp

# Se no terminal for mostrado a mensagem "Ready", então o servidor está funcionando
# e você pode acessar localhost:8080

# P.s - Firefox apresenta problemas de CORS (Cross Origin Request Security) enquanto roda o app na máquina local devido ao
# contato entre o app e API utilizada pelo app que se encontra em outro endereço eletrônico.
# Uma opção é desabilitar CORS no Firefox;
# Uma segunda opção é abrir o app no Google Chrome.

```

## Licenses and Copyright

Copyright (C) 2019 Pedro Gabriel Lima.  
