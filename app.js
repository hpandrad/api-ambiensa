const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const app = express();
// const controllers = require('./app/controllers/postgresql.controller');
const controllers = require('./app/controllers/mysql.controller');
const PORT = process.env.PORT || 8080;

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (request, response) => {
  response.json({ message: 'Hola mundo!' });
});

app.get('/empresas', controllers.getEmpresas);
app.get('/empresaPorId/:id', controllers.getEmpresaPorId);
app.post('/login', controllers.setIniciarSesion)

app.listen(PORT, () => {
    console.log(`App running on port *:${PORT}.`);
});