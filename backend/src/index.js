const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');    
const routes = require('./routes');

const app = express();
app.use(express.json());

//app.use(cors);
// se colocar em produção o projeto, deveria usar opção origin: com endereço que pode acessar a aplicação
// se tivesse hospedado em 'http://meuapp.com'
app.use((req, res, next) => {
	//Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");
    //res.header("Access-Control-Expose-Headers", 'X-Total-Count');
    res.header("Access-Control-Allow-Headers", 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
	  //Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET, PUT, POST, DELETE, OPTIONS');
    app.use(cors());
    next();
});

app.use(routes);

dotenv.config();
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
});