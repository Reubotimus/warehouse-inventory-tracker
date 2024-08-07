const express = require("express");
const indexRouter = require("./routers/indexRouter");


const app = express();

app.use('/', indexRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("I'm listening!"));
