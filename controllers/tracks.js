// const { matchedData } = require('express-validator')
// const { handleHttpError } = require('../utils/handleError')

// // const getItems = async (req, res) => {
// //     try{
// //         const data = await tracksModel.find({})
// //         res.send(data)
// //     }catch(err){
// //         //Si nos sirve el de por defecto que hemos establecido, no es necesario pasar el 403
// //         handleHttpError(res, 'ERROR_GET_ITEMS', 403)
// //    }
// // }

// const createItem = async (req, res) => {
//     try {
//         const body = matchedData(req) //El dato filtrado por el modelo (probar con body=req)
//         const data = await tracksModel.create(body)
//     res.send(data)
//     }catch(err){
//         handleHttpError(res, 'ERROR_CREATE_ITEMS')
//     }
// }

// const getItem = async (req, res) => {
//     try {
//         const { id } = matchedData(req);
//         const data = await tracksModel.findById(id);
//         res.send(data);
//     } catch (err) {
//         handleHttpError(res, 'ERROR_GET_ITEM');
//     }
// };

// const updateItem = async (req, res) => {
//     try {
//         const { id, ...body } = matchedData(req);
//         const data = await tracksModel.findOneAndUpdate(id, body, { new: true });
//         res.send(data);
//     } catch (err) {
//         handleHttpError(res, 'ERROR_UPDATE_ITEM');
//     }
// };


// // const deleteItem = async (req, res) => {
// //     try {
// //         const { id } = matchedData(req);
// //         const data = await tracksModel.deleteOne({ _id: id });
// //         res.send(data);
// //     } catch (err) {
// //         handleHttpError(res, 'ERROR_DELETE_ITEM');
// //     }
// // };

// const deleteItem = async (req, res) => {
//     try {
//         const { id } = matchedData(req);
//         const data = await tracksModel.delete({ _id: id });
//         res.send(data);
//     } catch (err) {
//         handleHttpError(res, 'ERROR_SOFT_DELETE');
//     }
// };


const { matchedData } = require("express-validator");
const { handleHttpError } = require("../utils/handleError");
const UserModel = require("../models/nosql/users");

const getItems = async (req, res) => {
    try {
        const data = await UserModel.find({});
        res.send(data);
    } catch (err) {
        handleHttpError(res, 'ERROR_GET_ITEMS');
    }
};

const getItem = async (req, res) => {
    try {
        const { id } = matchedData(req);
        const data = await UserModel.findById(id);
        res.send(data);
    } catch (err) {
        handleHttpError(res, 'ERROR_GET_ITEM');
    }
};

const createItem = async (req, res) => {
    try {
        const body = matchedData(req);
        const data = await UserModel.create(body);
        res.send(data);
    } catch (err) {
        handleHttpError(res, 'ERROR_CREATE_ITEM');
    }
};

const updateItem = async (req, res) => {
    try {
        const { id, ...body } = matchedData(req);
        const data = await UserModel.findOneAndUpdate({ _id: id }, body, { new: true });
        res.send(data);
    } catch (err) {
        handleHttpError(res, 'ERROR_UPDATE_ITEM');
    }
};



const deleteItem = async (req, res) => {
    try {
        const { id } = matchedData(req); 
        const user = await UserModel.findById(id);

        if (!user) {
            return res.status(404).send({ error: "Usuario no encontrado" });
        }

        await UserModel.delete({ _id: id }); // Soft delete
        res.send({ message: "Usuario eliminado lógicamente", user });
    } catch (err) {
        handleHttpError(res, "ERROR_DELETE_USER");
    }
};

module.exports = { deleteItem };


module.exports = { getItems, getItem, createItem, updateItem, deleteItem };

