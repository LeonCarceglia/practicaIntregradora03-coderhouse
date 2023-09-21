import { faker } from "@faker-js/faker/locale/en"


const createProduct = () => {
    return {
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        code: Math.floor(100000 + Math.random() * 900000),
        price: faker.commerce.price(),
        stock: Math.floor(10 + Math.random() * 90),
        category: "Unisex"
    }
}

export const generateProductsMock = () => {
    let products = []
    for(let i = 0; i< 50; i++){
        products.push(createProduct())
    }
    return products
}

