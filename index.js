const express = require("express");
const indexRouter = require("./routers/indexRouter");

const app = express();
app.use(express.urlencoded());
app.use(express.static('public'))

app.set('views', 'views');
app.set('view engine', 'ejs');

app.use('/', indexRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("I'm listening!"));
