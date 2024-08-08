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
        items: await getItemsCategory(decodeURIComponent(req.params.category)),
        category: decodeURIComponent(req.params.category)
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
    await postItem(req.body.name, decodeURI(req.params.category));
    if (Object.keys(req.query).length == 1) {
        res.redirect('/');
    } else {
        res.redirect(encodeURI('/categories/' + req.params.category))
    }
}

async function checkValidCategory(req, res, next) {
    const categories = await getCategories();
    const searchedCategory = decodeURIComponent(req.params.category);
    let validCategory = false;
    categories.forEach(category => {
        if (category.name == searchedCategory) {
            validCategory = true;
        }
    });
    if (!validCategory) {
        res.send('404 not a valid category');
        return;
    }
    next()
}

function handleIndexPost(req, res) {
    console.log(req.body)
    res.redirect(307, encodeURI('/categories/' + req.body.category + '?index=1'))
}

module.exports = {handleIndexPost, checkValidCategory, createItem, createCategory, renderCategory, renderCategories, renderItems}