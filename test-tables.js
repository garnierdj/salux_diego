require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function test() {
    try {
        // Try to count users (should work even if table is empty)
        const count = await prisma.user.count();
        console.log('✅ Database connection works!');
        console.log(`✅ Found ${count} users in database`);

        // List all tables
        const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `;
        console.log('✅ Tables:', tables.map(t => t.table_name));

        await prisma.$disconnect();
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

test();