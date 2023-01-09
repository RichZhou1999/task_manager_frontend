const express = require("express")
const cors = require("cors")
const app = express()
app.use(
    cors({
        origin:"//192.168.0.128:8080"
    })
)
