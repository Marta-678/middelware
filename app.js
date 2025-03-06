const express = require('express')
const cors = require('cors')
require ('dotenv').config()

const routers = require('./routes/users.js')
const authRouters = require('./routes/auth.js')

const dbConnect = require('./config/mongo.js')
dbConnect()
const app=express()
app.use(cors())
app.use(express.json())

// app.use('/api', routers)

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Escuchando en el puerto ${port}`)
})

app.use("/api/users", routers);
app.use("/api/auth", authRouters);






















// const express = require("express");
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const tracksRouter = require("./routes/tracks");

// dotenv.config();
// const app = express();

// app.use(express.json());
// app.use("/api/tracks", tracksRouter);

// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log("✅ Conectado a MongoDB"))
//     .catch(err => console.error("❌ Error conectando a MongoDB:", err));

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));
