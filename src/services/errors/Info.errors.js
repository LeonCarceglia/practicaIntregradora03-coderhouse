export const generateUserErrorInfo = (user) => {
  return `
    One or more properties were incomplete or not valid.
    List of required properties:
    * first_name : Needs to be a string, received ${user.first_name}
    * last_name  : Needs to be a string, received ${user.last_name}
    * email      : Needs to be a string, received ${user.email}
  `
}

export const generateProductErrorInfo = (product) => {
  return `
    One or more properties were incomplete or not valid.
    List of required properties:
    * title : Needs to be a string, received ${product.title}
    * description  : Needs to be a string, received ${product.description}
    * code  : Needs to be a number, received ${product.code}
    * price  : Needs to be a number, received ${product.price}
    * stock  : Needs to be a number, received ${product.stock}
    * category  : Needs to be a string, received ${product.category}
  `
}


