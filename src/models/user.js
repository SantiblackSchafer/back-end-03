const mongoose = require('mongoose');

// Definición del esquema de usuario
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'], 
        trim: true, 
    },
    email: {
        type: String,
        required: [true, 'El correo electrónico es obligatorio'],
        unique: true, 
        trim: true,
        lowercase: true, 
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Por favor, ingresa un correo electrónico válido'], 
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
        minlength: [6, 'La contraseña debe tener al menos 6 caracteres'], 
    },
    role: {
        type: String,
        enum: ['user', 'admin'], 
        default: 'user', 
    },
    carrito: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart', 
    },
}, {
    timestamps: true, 
});

 // eliminar información sensible antes de enviar el objeto
userSchema.methods.toJSON = function () {
    const user = this.toObject();
    delete user.password; 
    return user;
};


module.exports = mongoose.model('User', userSchema);
