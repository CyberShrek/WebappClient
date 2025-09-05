function sayHello(name) {
    return `Hello, ${name}! This is from shared package!`;
}

// Экспортируем её
module.exports = { sayHello };