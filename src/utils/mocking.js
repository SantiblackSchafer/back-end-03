const bcrypt = require('bcrypt');


// Generar usuarios mock
const generateMockUsers = async (num) => {
    const users = [];
    const passwordHash = await bcrypt.hash('coder123', 10);

    for (let i = 0; i < num; i++) {
        users.push({
        name: faker.name.firstName(),
        email: faker.internet.email(),
        password: passwordHash,
        role: 'user',
        carrito: faker.datatype.uuid(),
        });
    }
    return users;
    };

    // Generar carritos mock
const generateMockCarts = (num) => {
    const carts = [];

    for (let i = 0; i < num; i++) {
        carts.push({
        items: Array.from({ length: faker.datatype.number({ min: 1, max: 5 }) }, () => ({
            product: faker.commerce.productName(),
            quantity: faker.datatype.number({ min: 1, max: 10 }),
            price: faker.commerce.price(),
        })),
        });
    }

    return carts;
};

module.exports = { generateMockUsers, generateMockCarts };

