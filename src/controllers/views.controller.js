import { cartService } from "../services/index.js"
import { productService } from "../services/index.js"
import { userService } from "../services/index.js"
import { transporter } from "../config/nodemailer.config.js"
import jwt from "jsonwebtoken"


const getProductsRender = async (req, res) => {
    const user = userService.getCurrentUser(req.session.user)
    const page = parseInt(req.query.page || 1)
    const products = await productService.getProductsRender(page)
    const productsRender = products.docs.map((item) => {
        return {
            title: item.title,
            description: item.description,
            price: item.price,
            category: item.category,
            stock: item.stock,
            _id: item._id,
            cart: user.cart
        }
    })
    const paginationInfo = {
        page: products.page,
        totalPages: products.totalPages,
        hasNextPage: products.hasNextPage,
        nextPage: page < products.totalPages ? page + 1 : null,
        prevPage: page > 1 ? page - 1 : null
    }
    res.render("products", { products: productsRender, paginationInfo, user })
}

const getCart = async (req, res) => {
    const { cid } = req.params
    const cart = await cartService.getCart(cid)
    const cartRender = cart.type.map((item) => {
        return {
            product: item.product,
            quantity: item.quantity,
        }
    })
    res.render('carts', { cart: cartRender })
}

const register = (req, res) => {
    res.render('register')
}

const login = (req, res) => {
    res.render('login')
}

const current = (req, res) => {
    const user = userService.getCurrentUser(req.session.user)
    res.render('current', { user })
}

const logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login')
    })
}

const chat = (req, res) => {
    res.render("chat", {})
}

const loggerTest = (req, res) => {
    req.logger.debug("Test debug")
    req.logger.http("Test http")
    req.logger.info("Test info")
    req.logger.warning("Test warning")
    req.logger.error("Test error")
    req.logger.fatal("Test fatal")
    res.send({ message: "Logger test" })
}

const resetPass = (req, res) => {
    res.render('resetPassword')
}

const sendEmailNewPass = (req, res) => {
    const { email } = req.body
    const token = jwt.sign({ email }, 'CoderSecretFelis', { expiresIn: '1h' })
    const currentUrl = req.protocol + "://" + req.get("host")
    const resetLink = currentUrl + `/newPass/${token}/${email}`
    const mailOptions = {
        from: 'pruebaCoder@no-reply.com',
        to: email,
        subject: 'Reset Password',
        text: `To reset your password, click the following link: ${resetLink}`
    }
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            req.logger.error()
            res.status(500).send('Error sending email')
        } else {
            req.logger.info('Email sent: ' + info.response)
            res.send('Success email sent')
        }
    })
}

const newPass = (req, res) => {
    const currentUrl = req.protocol + "://" + req.get("host")
    
    try {
        const decoded = jwt.verify(req.params.token, 'CoderSecretFelis')
        
        if (decoded.email === req.params.email) {
            res.render("newPassword", { currentUrl })
        } else {
            res.status(400).send('Invalid reset link.')
        }
    } catch (error) {
        res.render("tokenExpired")
    }
}


export default {
    getProductsRender,
    getCart,
    register,
    login,
    logout,
    current,
    chat,
    loggerTest,
    resetPass,
    sendEmailNewPass,
    newPass
}