import CustomRouter from "./router.js"
import productsController from "../controllers/products.controller.js"

export default class ProductsRouter extends CustomRouter {
    init() {
        this.get("/:limit?/:page?/:query?/:sort?", ["PUBLIC"], productsController.getProducts)

        this.get("/:id", ["PUBLIC"], productsController.getProduct)

        this.put("/:id", ["ADMIN", "PREMIUM"], productsController.updateProduct)

        this.post("/", ["ADMIN", "PREMIUM"], productsController.createProduct)

        this.delete("/:id", ["ADMIN", "PREMIUM"], productsController.deleteProduct)
        
        this.post("/mockingproducts", ["ADMIN"], productsController.generateProductsMock)
    }
}