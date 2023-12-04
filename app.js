require('dotenv').config();
const express = require("express");
const app = express();
const { PORT } = process.env;
const crud = require('./routes/crud.routes');

app.use(express.json())
app.use('/api', crud);
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));