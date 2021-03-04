const routes = require("./controller/routes.js");
const express = require('express'),
dotenv = require('dotenv'),
cors = require('cors'),
app = express();

dotenv.config();
app.use(cors())
app.use(express.json());
app.use(routes);

app.listen( process.env.PORT, ()=> {
    console.log("Server running")
})