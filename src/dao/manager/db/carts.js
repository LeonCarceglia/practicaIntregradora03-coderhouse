import cartModel from "../../models/cart.js"
import productModel from "../../models/product.js"

export default class CartsManager {

    constructor() {
    }

    getCarts = () => {
        return cartModel.find().lean()
    }

    getCart = (id) => {
        return cartModel.findById(id)
            .populate("products.product", "_id title description price stock")
            .lean()
    }

    createCart = (products = []) => {
        return cartModel.create({ products })
    }

    updateCart = (id, cart) => {
        return cartModel.findByIdAndUpdate(id, { products: cart })
    }

    deleteCart = (id) => {
        return cartModel.findByIdAndDelete(id)
    }

    addProductToCart = (ids, quantity) => {
        cartModel.findById(ids.cid)
            .then(cart => {
                const existingProductIndex = cart.products.findIndex(item => item.product._id == ids.pid)
                if (existingProductIndex !== -1) {
                    cart.products[existingProductIndex].quantity += +quantity
                } else {
                    cart.products.push({ product: ids.pid, quantity })
                }
                return cart.save()
            })
    }

    deleteProduct = (ids) => {
        cartModel.findById(ids.cid)
            .then(cart => {
                const productIndex = cart.products.findIndex(product => product === ids.pid)
                cart.products.splice(productIndex, 1)
                return cart.save()
            })
    }

    updateProductQuantity = (ids, quantity) => {
        return cartModel.findOneAndUpdate(
            { _id: ids.cid, "products.product": ids.pid },
            { $set: { "products.$.quantity": quantity } },
            { new: true }
        )
    }

    deleteProducts = (id) => {
        return cartModel.findByIdAndUpdate(id, { products: [] })
    }

    purchase = async (id, logger) => {
        try {
            
            const cart = await cartModel.findById(id).populate("products.product", "_id title description price stock")
            let totalAmount = 0
            const unstockProducts = []
            for (const item of cart.products) {
                if (item.product.stock < item.quantity) {
                    logger.info(`Insufficient quantity for product: ${item.product.title}`)
                    unstockProducts.push(item)
                } else {
                    const newStock = item.product.stock - item.quantity
                    await productModel.findByIdAndUpdate(item.product._id, { stock: newStock })
                    totalAmount += +item.product.price * item.quantity
                }
            }
            cart.products = unstockProducts
            await cart.save()
            return totalAmount
        } catch (error) {
            console.error('Error fetching or updating cart:', error)
            throw error
        }
    }
}