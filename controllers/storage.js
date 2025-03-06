const { storageModel } = require('../models/nosql/storage')

const getItems = async (req, res) => {
    const data = await storageModel.find({})
    res.send(data)
}

const getItem = async (req, res) => {
    const data = await storageModel.findOne({email});
    res.send(data)
}

const createItem = async (req, res) => {
    const { body } = req
    const data = await storageModel.create(body)
    res.send(data)
}

const updateItem = async (req, res) => {

    const email = req.params.email;
    const data = await storageModel.findOndeAndDelete(
        {email},
        req.body);
    res.JSON(data);
}

const deleteItem = async (req, res) => {

    const data = await storageModel.findOndeAndDelete({email: req.params.email})
    res.json(data);
}

const updateImage = async (req, res) => {
    try {
    const id = req.params.id
    const fileBuffer = req.file.buffer
    const fileName = req.file.originalname
    const pinataResponse = await uploadToPinata(fileBuffer, fileName)
    const ipfsFile = pinataResponse.IpfsHash
    const ipfs = `https://${process.env.PINATA_GATEWAY_URL}/ipfs/${ipfsFile}`
    const data = await userModel.findOneAndUpdate({_id: id }, {image: ipfs}, { new: true })
    res.send(data)
    }catch(err) {
    console.log(err)
    res.status(500).send("ERROR_UPLOAD_COMPANY_IMAGE")
    //handleHttpError(res, "ERROR_UPLOAD_COMPANY_IMAGE")
    }
   }

module.exports = {getItems, getItem, createItem, updateItem, deleteItem, updateImage};


