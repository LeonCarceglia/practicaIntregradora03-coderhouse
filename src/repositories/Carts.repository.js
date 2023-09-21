class CartsRepository {
    constructor(dao){
        this.dao = dao
    }

    async getCarts(){
        try{
            return await this.dao.getCarts()
        }
        catch(error){
            throw(error)
        }
    }

    async getCart(id){
        try{
            return await this.dao.getCart(id)
        }
        catch(error){
            throw(error)
        }
    }

    async createCart(products){
        try{
            return await this.dao.createCart(products)
        }
        catch(error){
            throw(error)
        }
    }

    async updateCart(id, cart){
        try{
            return await this.dao.updateCart(id, cart)
        }
        catch(error){
            throw(error)
        }
    }

    async deleteCart(id){
        try{
            return await this.dao.deleteCart(id)
        }
        catch(error){
            throw(error)
        }
    }

    async addProductToCart(ids, quantity){
        try{
            return await this.dao.addProductToCart(ids, quantity)
        }
        catch(error){
            throw(error)
        }
    }

    async deleteProduct(ids){
        try{
            return await this.dao.deleteProduct(ids)
        }
        catch(error){
            throw(error)
        }
    }

    async updateProductQuantity(ids, quantity){
        try{
            return await this.dao.updateProductQuantity(ids, quantity)
        }
        catch(error){
            throw(error)
        }
    }

    async deleteProducts(id){
        try{
            return await this.dao.deleteProducts(id)
        }
        catch(error){
            throw(error)
        }
    }

    async purchase(id, logger){
        try {
            return await this.dao.purchase(id, logger)
        }
        catch(error){
            throw(error)
        }
    }
}

export default CartsRepository