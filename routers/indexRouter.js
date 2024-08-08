const express = require('express');
const indexRouter = express.Router();
const {handleIndexPost, checkValidCategory, createItem, createCategory, renderCategory, renderCategories, renderItems} = require('../controlers/indexControler');

indexRouter.get('/', renderItems);
indexRouter.post('/', handleIndexPost);

indexRouter.get('/categories', renderCategories);
indexRouter.post('/categories', createCategory);
indexRouter.put('/categories', (req, res) => res.send('update category'));
indexRouter.delete('/categories', (req, res) => res.send('delete category'));


indexRouter.use('/categories/:category', checkValidCategory);
indexRouter.get('/categories/:category', renderCategory);
indexRouter.post('/categories/:category', createItem);
indexRouter.put('/categories/:category', (req, res) => res.send('update item with category ' + req.params.category));
indexRouter.delete('/categories/:category', (req, res) => res.send('delete item with category ' + req.params.category));

module.exports = indexRouter;