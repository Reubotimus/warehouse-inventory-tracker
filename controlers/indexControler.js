const {testDb, getAllItems, getItemsCategory, postItem, postCategory, getCategories, getCategoryCounts} = require('../db/requests');

async function renderItems(req, res) {
    const items = await getAllItems(), categories = await getCategories();
    console.log(categories);
    res.render('index', {items: items, categories: categories});
}

async function renderCategories(req, res) {
    const categories = await getCategoryCounts();
    // console.log(categories);
    res.render('categories', {categories: categories});
}

async function renderCategory(req, res) {
    res.render('category', {
        items: await getItemsCategory(req.params.category),
        category: req.params.category
    });
}

async function createCategory(req, res) {
    let categories = await getCategories();
    categories.forEach(category => {
        if (category.name == req.body['category-name']) {
            res.send('Already a category');
            return;
        }
    })
    await postCategory(req.body['category-name']);
    res.redirect('/categories')
}

async function createItem(req, res) {
    await postItem(req.body.name, req.params.category);
    res.redirect('/')
}

async function testController(req, res) {
    const result = await testDb();
    // console.log(result);
    res.send("worked");
}

async function checkValidCategory(req, res, next) {
    const categories = await getCategories();
    let validCategory = false;
    categories.forEach(category => {
        if (category.name == req.params.category) {
            validCategory = true;
        }
    });
    if (!validCategory) {
        res.send('404 not a valid category');
        return;
    }
    next()
}

module.exports = {checkValidCategory, testController, createItem, createCategory, renderCategory, renderCategories, renderItems}