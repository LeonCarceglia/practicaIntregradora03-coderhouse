import express from "express"
import session from "express-session"
import handlebars from "express-handlebars"
import mongoose from "mongoose"
import MongoStore from "connect-mongo"
import passport from "passport"
import { Server } from "socket.io"

import initializePassport from "./config/passport.config.js"

import ViewsRouter from "./routes/views.router.js"
import ProductsRouter from "./routes/products.router.js"
import CartsRouter from "./routes/carts.router.js"
import SessionsRouter from "./routes/session.router.js"

import { __dirname } from "./utils.js"
import { initializeSocket } from "./utils.js"
import { addLoger } from "./config/logger.js"
import config from "./config/config.js"
import ErrorHandler from "./config/error.config.js"

const viewsRouter = new ViewsRouter()
const productsRouter = new ProductsRouter()
const cartsRouter = new CartsRouter()
const sessionsRouter = new SessionsRouter()

const app = express()
const connection = await mongoose.connect(config.MONGODB_URL)

app.use(
  session({
    store: new MongoStore({
      mongoUrl:
        config.MONGODB_URL,
      ttl: 3600,
    }),
    secret: "CoderS3cretFelis",
    resave: false,
    saveUninitialized: false,
  })
)
app.use(addLoger)
app.use(ErrorHandler)

app.engine("handlebars", handlebars.engine())
app.set("views", __dirname + "/views")
app.set("view engine", "handlebars")

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(__dirname + "/public"))

initializePassport()
app.use(passport.initialize())
app.use(passport.session())

app.use("/", viewsRouter.getRouter())
app.use("/api/products", productsRouter.getRouter())
app.use("/api/carts", cartsRouter.getRouter())
app.use("/api/sessions", sessionsRouter.getRouter())

const httpServer = app.listen(config.PORT, () => {
  console.log(`Listening on port ${config.PORT}!`)
})

const io = new Server(httpServer)
initializeSocket(io)