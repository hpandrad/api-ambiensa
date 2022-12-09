// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require("cors");
// const app = express();
// const PORT = process.env.PORT || 3000;
// // const routers = require('./app/routes/index');

// // var corsOptions = {
// //   origin: `https://localhost:${PORT}`
// // };

// // app.use(cors(corsOptions));

// app.use(cors()); 



// // parse requests of content-type - application/json
// app.use(bodyParser.json());

// // parse requests of content-type - application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: true }));

// // app.use(routers);

// router.get('/', (request, response) => {
//     response.send('Hola mundo cruel... jajajaja..!');
// });

// router.get('/test', (request, response) => {
//     response.send('ESTA ES UNA PRUEBA...');
// });

// app.listen(PORT, () => {
//     console.log(`App running on port *:${PORT}.`);
// });


var express = require('express')
var cors = require('cors')
var app = express()
const PORT = process.env.PORT || 3000;

app.use(cors())

app.use(function (req, res, next) {
    res.json({msg: PORT})
  })

app.get('/products/:id', function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
})

app.listen(PORT, function () {
  console.log('CORS-enabled web server listening on port 80')
})