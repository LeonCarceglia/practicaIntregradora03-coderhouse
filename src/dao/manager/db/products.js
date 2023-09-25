import productModel from "../../models/product.js"
import { generateProductsMock } from "../../../mocks/products.mock.js"

export default class ProductsManager {

    constructor() {
    }

    getProducts = async (req, currentUrl) => {
        const { limit = 10, page = 1, sort = "desc", query = null } = req
        const options = {
            limit,
            page,
            lean: true,
            sort: { price: sort }
        }
        let condition = {}
        if (query == "avaiable") {
            condition = { stock: { $gt: 0 } }
        }
        else if (query != undefined) {
            condition = { category: query }
        }

        const result = await productModel.paginate(condition, options)
        if (!currentUrl.endsWith("/")) {
            currentUrl += "/"
        }
        if (!currentUrl.includes("page=")) {
            if (currentUrl.includes("?")) {
                currentUrl += `&page=1`
            } else {
                currentUrl += `?page=1`
            }
        }
        let prevLink = null
        if (result.hasPrevPage) {
            prevLink = currentUrl.replace(`page=${page}`, `page=${result.prevPage}`)
        }
        result.prevLink = prevLink
        let nextLink = null
        if (result.hasNextPage) {
            nextLink = currentUrl.replace(`page=${page}`, `page=${result.nextPage}`)
        }
        result.nextLink = nextLink

        return result
    }

    getProduct = (id) => {
        return productModel.findById(id)
    }

    createProduct = (product) => {
        return productModel.create(product)
    }

    updateProduct = async (id, product, user) => {
        const productSearch = await productModel.findByIdAndUpdate(id, product)
        if (productSearch.owner === user.email || "admin" === user.role){
            return productSearch
        }
        else{
            return "Only owner or admin can updated product"
        }
    }

    deleteProduct = async (id, user) => {
        const productDelete = await productModel.findByIdAndDelete(id)
        if (productDelete.owner === user.email || "admin" === user.role){
            return productDelete
        }
        else{
            return "Only owner or admin can delete product"
        }
    }

    getProductsRender = async (page) => {
        const options = {
            page: page,
            limit: 10,
            lean: true,
        }
        return await productModel.paginate({}, options)
    }

    createProductsMock = () => {
        return productModel.insertMany(generateProductsMock())
    }
}