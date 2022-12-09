const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;
const routers = require('./app/routes/index');

// var corsOptions = {
//   origin: `https://localhost:${PORT}`
// };

// app.use(cors(corsOptions));

app.use(cors()); 



// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(routers);

app.listen(PORT, () => {
    console.log(`App running on port *:${PORT}.`);
});