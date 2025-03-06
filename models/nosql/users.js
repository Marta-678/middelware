const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    age: {
      type: Number
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String // Aquí se almacenará el hash de la contraseña
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    }
  },
  {
    timestamps: true, // Crea campos createdAt y updatedAt
    versionKey: false
  }
);

UserSchema.plugin(mongooseDelete, { overrideMethods: "all" });
module.exports = mongoose.model("users", UserSchema);


