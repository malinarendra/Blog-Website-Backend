const express = require("express")
require("dotenv").config()// load all environment variables
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const { router } = require("./router/router")
const { connectToDatabase } = require("./db/connection")

const app = express()
const port = process.env.PORT || 3600

// middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: false,
}));
app.use(cookieParser())
app.use("/api/v1", router)

// mongodb database connection
connectToDatabase()


app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})