const { Pool } = require('pg');

const pool = new Pool({
    host: "localhost", // or wherever the dbis hosted
    user: "reubencook",
    database: "categories",
    password: process.env.DATABASE_PASSWORD,
    port: 5432 // The default port
});

pool.on('connect', () => {
    console.log('Connected to the database');
});

pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});

module.exports = pool;