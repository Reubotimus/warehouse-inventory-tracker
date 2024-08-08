const pool = require('./pool');

async function getAllItems() {
    try {
        const result = await pool.query('SELECT name, category FROM items');
        const items = result.rows;
        if (!items) {return []}
        return items;
    } catch (error) {
        console.error('error recieving items', error);
        return [];
    }
}

async function getItemsCategory(category) {
    try {
        const result = await pool.query('SELECT name, category FROM items WHERE category = $1', [category]);
        const items = result.rows;
        if (!items) {return []}
        return items;
    } catch (error) {
        console.error('error recieving items', error);
        return [];
    }
}

async function postItem(name, category) {
    await pool.query('INSERT INTO items (name, category) VALUES ($1, $2)', [name, category]);
}

async function postCategory(category) {
    // console.log(category);
    await pool.query('INSERT INTO categories (name) VALUES ($1)', [category]);
}

async function getCategories() {
    try {
        const result = await pool.query('SELECT name FROM categories');
        const categories = result.rows;
        if (!categories) {return []}
        return categories;
    } catch (error) {
        console.error('error recieving categories', error);
        return [];
    }
}

async function getCategoryCounts() {
    try {
        const result = await pool.query('SELECT categories.name, COUNT(items.category) AS count FROM items RIGHT JOIN categories ON (items.category=categories.name) GROUP BY categories.name');
        const categories = result.rows;
        // console.log(categories);
        if (!categories) {
            return [];
        }
        return categories;
    } catch (error) {
        console.error('Error executing query', error);
        return [];
    }
}

async function testDb() {
    try {
        const result = await pool.query('SELECT NOW()');
        // console.log(result.rows); // This should log the current timestamp from the database
        return result.rows;
    } catch (error) {
        console.error('Error executing query', error);
        return [];
    }
}

module.exports = {testDb, getAllItems, getItemsCategory, postItem, postCategory, getCategories, getCategoryCounts};