import CustomRouter from "./router.js"
import viewsController from "../controllers/views.controller.js"

export default class ViewsRouter extends CustomRouter {
    init() {
        this.get("/products/:page?", ["PUBLIC"], viewsController.getProductsRender)

        this.get('/cart/:cid', ["PUBLIC"], viewsController.getCart)

        this.get('/register', ["PUBLIC"], viewsController.register)

        this.get('/login', ["PUBLIC"], viewsController.login)

        this.get('/', ["PUBLIC"], viewsController.login)

        this.get('/logout', ["PUBLIC"], viewsController.logout)

        this.get("/current", ["PUBLIC"], viewsController.current)

        this.get("/chat", ["USER"], viewsController.chat)

        this.get("/loggerTest", ["ADMIN"], viewsController.loggerTest)

        this.get("/resetPass", ["PUBLIC"], viewsController.resetPass)
        
        this.post("/sendEmailNewPass", ["PUBLIC"], viewsController.sendEmailNewPass)

        this.get("/newPass/:token?/:email", ["PUBLIC"], viewsController.newPass)

    }
}