const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartItemSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: [true, 'El producto es requerido'],
    },
    quantity: {
        type: Number,
        required: [true, 'La cantidad es requerida'],
        min: [1, 'La cantidad mínima es 1'],
        default: 1
    },
    price: {
        type: Number,
        required: [true, 'El precio es requerido'],
        min: [0, 'El precio no puede ser negativo']
    }
}, {
    timestamps: true
});

const cartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'El usuario es requerido']
    },
    items: [cartItemSchema],
    total: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ['active', 'completed', 'abandoned'],
        default: 'active'
    }
}, {
    timestamps: true
});

// calcular el total del carrito
cartSchema.methods.calculateTotal = function() {
    this.total = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    return this.total;
};

// agregar un item al carrito
cartSchema.methods.addItem = function(productId, quantity, price) {
    const existingItem = this.items.find(item => item.product.equals(productId));
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        this.items.push({ product: productId, quantity, price });
    }
    
    this.calculateTotal();
    return this;
};

// remover un item del carrito
cartSchema.methods.removeItem = function(productId) {
    this.items = this.items.filter(item => !item.product.equals(productId));
    this.calculateTotal();
    return this;
};

// Middleware pre-save para asegurar que el total esté actualizado
cartSchema.pre('save', function(next) {
    this.calculateTotal();
    next();
});


cartSchema.index({ user: 1, status: 1 });
cartSchema.index({ updatedAt: 1 });

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
