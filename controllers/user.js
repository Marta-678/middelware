const UserModel = require('../models/nosql/users.js');

const getItems = async (req, res) => {
    try {
        const data = await UserModel.find();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error obteniendo los usuarios', details: error.message });
    }
};

const createItem = async (req, res) => {
  try {
      console.log('Body recibido:', req.body); // 🔍 Verifica qué datos llegan

      if (!req.body.email || !req.body.name) {
          return res.status(400).json({ error: 'Email y Name son requeridos' });
      }

      const data = await UserModel.create(req.body);
      res.status(201).json(data);
  } catch (error) {
      res.status(500).json({ error: 'Error creando el usuario', details: error.message });
  }
};


const updateItem = async (req, res) => {
    try {
        const { email } = req.params;
        if (!email) return res.status(400).json({ error: 'Email es requerido' });

        const data = await UserModel.findOneAndUpdate(
            { email },
            req.body,
            { new: true, runValidators: true } // new: true devuelve el documento actualizado
        );

        if (!data) return res.status(404).json({ error: 'Usuario no encontrado' });

        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error actualizando el usuario', details: error.message });
    }
};

const deleteItem = async (req, res) => {
    try {
        const { email } = req.params;
        if (!email) return res.status(400).json({ error: 'Email es requerido' });

        const data = await UserModel.findOneAndDelete({ email });

        if (!data) return res.status(404).json({ error: 'Usuario no encontrado' });

        res.json({ message: 'Usuario eliminado', data });
    } catch (error) {
        res.status(500).json({ error: 'Error eliminando el usuario', details: error.message });
    }
};

const getItem = async (req, res) => {
    try {
        const { email } = req.params;
        if (!email) return res.status(400).json({ error: 'Email es requerido' });

        const data = await UserModel.findOne({ email });

        if (!data) return res.status(404).json({ error: 'Usuario no encontrado' });

        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error obteniendo el usuario', details: error.message });
    }
};

module.exports = { getItem, getItems, updateItem, createItem, deleteItem };


// const {UserModel}= require('../models/nosql/users.js');

// const getItems = async (req, res) => {
//   try {
//     const data = await UserModel.find({});
//     res.json(data);
//   } catch (error) {
//     res.status(500).json({ error: "Error al obtener tracks" });
//   }
// };

// const getItem = async (req, res) => {
//     const data = await UserModel.findOne({email});
//     res.send(data)
// }

// const createItem = async (req, res) => {
//     const { body } = req
//     //console.log(body)
//     const data = await
//     UserModel.create(body)
//     res.send(data)
// }

// const updateItem = async (req, res) => {

//     const email = req.params.email;
//     const data = await UserModel.findOndeAndDelete(
//         {email},
//         req.body);
//     res.JSON(data);
// }

// const deleteItem = async (req, res) => {

//     const data = await UserModel.findOndeAndDelete({email: req.params.email})
//     res.json(data);
// }

// module.exports = {getItems, getItem, createItem, updateItem, deleteItem};



// // const UserModel= require('../models//nosql/users.js');

// // const getItems = async (req, res) => {
// //   try {
// //     const data = await UserModel.find({});
// //     res.json(data);
// //   } catch (error) {
// //     res.status(500).json({ error: "Error al obtener tracks" });
// //   }
// // };
// // const getItem = async (req, res) => {
// //   // Implementa la obtención de un item por ID
// // };
// // const createItem = async (req, res) => {
// //   try {
// //     const body  = req.body;
// //     const data = await UserModel.create(body);
// //     res.status(201).json(data);
// //   } catch (error) {
// //     res.status(500).json({ error: "Error al crear track" });
// //   }
// // };


// // const updateItem = async (req, res) => {
// //   const email= req.param.email;
// //   const data = await UserModel.findOneAndReplace(
// //     {email},
// //     req.body
// //   );
// //   res.json(data);
 
// // };

// // const deleteItem = async (req, res) => {
// //   const data= 
// // };
// // module.exports = { getItems, getItem, createItem, updateItem, deleteItem };
