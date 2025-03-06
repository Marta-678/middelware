const express = require('express')
const {getItem, getItems, updateItem, createItem, deleteItem} = require ('../controllers/user')

const userRouter = express.Router();

userRouter.get('/', getItems);
userRouter.get('/:email', getItem);
userRouter.post('/', createItem);
userRouter.put('/:email', (req, res) => {
    console.log(req.params);
    updateItem(req, res);
});
userRouter.delete('/:email', deleteItem);

module.exports = userRouter;

// const express = require("express");
// const router = express.Router();

// const { getItems, getItem, createItem, updateItem, deleteItem } = require("../controllers/user");
// router.get("/", getItems);
// router.get("/:id", getItem);
// router.post("/", createItem);

// module.exports = router;