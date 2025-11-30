require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});

async function test() {
    try {
        console.log('Testing connection...');
        await prisma.$connect();
        console.log('✅ Connection successful!');
        await prisma.$disconnect();
    } catch (error) {
        console.error('❌ Connection failed:', error.message);
        process.exit(1);
    }
}

test();
