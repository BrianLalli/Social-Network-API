const express = require("express");
const app = express();
const connection = require("./config/connection");

const PORT = process.env.PORT || 3004;

// applying middleware
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(require("./routes"))

connection.once("open", ()=> {
    app.listen(PORT, () => {
        console.log("server is running")
    })
});






