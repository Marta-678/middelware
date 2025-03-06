// const express = require("express")
// const router = express.Router()
// const user = require("../models/nosql/users")

// router.get("/", (req, res) => {
//    const data = ["hola", "mundo", "tracks"]
//    res.send({data})
// })

// router.post("/", (req, res)=>{
//     let body="";
//     req.on('data', (chunk)=> body+= chunk.toString());
//     req.on('end', ()=>{
//         user.push(JSON.parse(body));
//         res.send(user);
//     })
// })

// module.exports = router

// const express = require("express");
// const router = express.Router();

// const { getItems, getItem, createItem, updateItem, deleteItem } = require("../controllers/user");
// router.get("/", getItems);
// router.get("/:id", getItem);
// router.post("/", createItem);

// module.exports = router;


const express = require("express");
const router = express.Router();
const { getItems, getItem, createItem, updateItem, deleteItem } = require("../controllers/tracks");
const { validatorCreateItem, validatorGetItem } = require("../validators/tracks");
const customHeader = require("../middelware/customHeader");

const authMiddleware = require("../middelware/session");
router.get("/", authMiddleware, getItems);

// router.get("/", getItems);
router.get("/:id", validatorGetItem, getItem);
router.post("/", validatorCreateItem, customHeader, createItem);
router.put("/:id", validatorGetItem, validatorCreateItem, updateItem);
router.delete("/:id", validatorGetItem, deleteItem);

module.exports = router;


