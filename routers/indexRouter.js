const express = require('express');
const indexRouter = express.Router();

indexRouter.get('/', (req, res) => res.send('all items'));

indexRouter.get('/categories', (req, res) => res.send('categories'));
indexRouter.post('/categories', (req, res) => res.send('new category'));
indexRouter.put('/categories', (req, res) => res.send('update category'));
indexRouter.delete('/categories', (req, res) => res.send('delete category'));

indexRouter.get('/categories/:category', (req, res) => res.send(req.params.category));
indexRouter.post('/categories/:category', (req, res) => res.send('new item with category ' + req.params.category));
indexRouter.put('/categories/:category', (req, res) => res.send('update item with category ' + req.params.category));
indexRouter.delete('/categories/:category', (req, res) => res.send('delete item with category ' + req.params.category));

module.exports = indexRouter;