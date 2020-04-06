const express = require('express');
const cors = require('cors');   
const routes = require('./routes');

const app = express();

app.use(cors);
// se colocar em produção o projeto, deveria usar opção origin: com endereço que pode acessar a aplicação
// se tivesse hospedado em 'http://meuapp.com'
app.use(express.json());
app.use(routes);

app.listen(3333);