require('dotenv').config()

const Request = require("request");
const accessTokenVerificationUrl = `${process.env.API_URL}validartoken`;


function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];

    if (bearerHeader) {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        //req.token = bearerToken;
        
        Request.get({
            "headers": { 
                "content-type": "application/json",
                "authorization": `Bearer ${bearerToken}`
            },
            "url": accessTokenVerificationUrl
        }, (error, response, body) => {
            const result = JSON.parse(body)

            if(result.ok) {
                next();
            } else {
                // res.sendStatus(403); // FORBIDDEN
                res.status(401).send({
                    message: "No autorizado"
                });
            }
        });    
    } else {      
        // res.sendStatus(403); // FORBIDDEN
        res.status(401).send({
            message: "No autorizado"
        });
    }
}

module.exports = {
    verifyToken
}