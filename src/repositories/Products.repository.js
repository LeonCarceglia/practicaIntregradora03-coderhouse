import ProductDTO from "../DTOs/Product.dto.js"

class ProductsRepository{
    constructor(dao){
        this.dao = dao
    }

    async getProducts(req, currentUrl){
        try{
            return await this.dao.getProducts(req, currentUrl)
        }
        catch(error){
            throw(error)
        }
    }

    getProduct(id){
        try{
            return new ProductDTO(this.dao.getProduct(id))
        }
        catch(error){
            throw(error)
        }
    }

    async createProduct(product){
        try{
            return await this.dao.createProduct(product)
        }
        catch(error){
            throw(error)
        }
    }

    async updateProduct(id, product, user){
        return await this.dao.updateProduct(id, product, user)
    }

    async deleteProduct (id, user){
        try{
            return await this.dao.deleteProduct(id, user)
        }
        catch(error){
            throw(error)
        }
    }

    async getProductsRender(page){
        try{
            return await this.dao.getProductsRender(page)
        }
        catch(error){
            throw(error)
        }
    }

    async generateProductsMock(){
        try{
            return await this.dao.createProductsMock()
        }
        catch(error){
            throw(error)
        }
    }
}

export default ProductsRepository