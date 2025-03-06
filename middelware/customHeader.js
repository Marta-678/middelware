const express = require('express')
router= express.Router();

// router.post('/', validatorCreateItem, customHeader, createItem)

// const customHeader = (req, res, next) => {
//     try {
//     const apiKey = req.headers.api_key;
//     if(apiKey === 'Api-publica-123') { //Probar con otra para ver el error
//     next()
//     }else {
//     res.status(403).send("api key no es correcto")
//     }
//     }catch(err) {
//     res.status(403).send(err)
//     }
//    }
//    module.exports = customHeader

const customHeader = (req, res, next) => {
    try {
        const apiKey = req.headers.api_key;
        const validApiKey = process.env.PINATA_KEY;
        if (apiKey === validApiKey) {
            next();
        } else {
            res.status(403).send("API key no es correcto");
        }
    } catch (err) {
        res.status(403).send(err);
    }
};

module.exports = customHeader;
