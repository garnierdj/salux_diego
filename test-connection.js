require('dotenv').config();
const url = process.env.DATABASE_URL;
if (url) {
    // Hide password but show the rest
    const hidden = url.replace(/:([^:@]+)@/, ':****@');
    console.log('Connection string format:', hidden);
    console.log('Has password:', url.includes('@') && url.split('@').length > 1);
} else {
    console.log('DATABASE_URL not found!');
}