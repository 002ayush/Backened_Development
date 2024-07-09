import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()
app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true
}))
//MiddleWares
app.use(express.json({limit : "16kb"}))
app.use(express.urlencoded({extended : true,limit : "16kb"}))
app.use(express.static("public/assets"))

app.use(cookieParser())

//Routes declaration and import it here only after using all the middlewares.
import Userrouter from "./routes/user.routes.js"
app.use("/api/v1/user",Userrouter)




export {app};