const express = require('express');
const { generateMockUsers, generateMockCarts } = require('../utils/mocking');
const User = require('../models/user');
const Cart = require('../models/cart');

const router = express.Router();

// Constantes para valores por defecto
const DEFAULT_CARTS_COUNT = 5;
const DEFAULT_USERS_COUNT = 50;

// Endpoint: mockingcarritos
router.get('/mockingcarritos', (req, res) => {
    try {
        const carritos = generateMockCarts(DEFAULT_CARTS_COUNT); 
        res.json({ status: 'success', data: carritos });
    } catch (err) {
        res.status(500).json({ status: 'error', message: 'Failed to generate mock carts', error: err.message });
    }
});

// Endpoint: mockingusers
router.get('/mockingusers', async (req, res) => {
    try {
        const users = await generateMockUsers(DEFAULT_USERS_COUNT);
        res.json({ status: 'success', data: users });
    } catch (err) {
        res.status(500).json({ status: 'error', message: 'Failed to generate mock users', error: err.message });
    }
});

// Endpoint: generateData
router.post('/generateData', async (req, res) => {
    const { users: usersCount, carritos: cartsCount } = req.body;

    try {
        
        const usersToGenerate = Math.max(0, parseInt(usersCount) || 0);
        const cartsToGenerate = Math.max(0, parseInt(cartsCount) || 0);

        // Generar usuarios y carritos
        const mockUsers = await generateMockUsers(usersToGenerate);
        const mockCarts = generateMockCarts(cartsToGenerate);

        // Guardar usuarios y carritos en la base de datos
        await User.insertMany(mockUsers);
        await Cart.insertMany(mockCarts);

        res.json({ status: 'success', message: 'Data generated and inserted successfully.', data: { users: mockUsers.length, carts: mockCarts.length } });
    } catch (err) {
        res.status(500).json({ status: 'error', message: 'Failed to generate and insert data', error: err.message });
    }
});

module.exports = router;
