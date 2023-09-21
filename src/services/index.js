import CartsManager from "../dao/manager/db/carts.js"
import ProductsManager from "../dao/manager/db/products.js"
import UsersManager from "../dao/manager/db/users.js"
import UserRepository from "../repositories/Users.repository.js"
import CartsRepository from "../repositories/Carts.repository.js"
import ProductsRepository from "../repositories/Products.repository.js"
import TicketManager from "../dao/manager/db/tickets.js"
import TicketRepository from "../repositories/Tickets.repository.js"
import MessageManager from "../dao/manager/db/messages.js"
import MessageRepository from "../repositories/Message.repository.js"

export const cartService = new CartsRepository(new CartsManager())
export const productService = new ProductsRepository(new ProductsManager())
export const userService = new UserRepository(new UsersManager())
export const ticketService = new TicketRepository(new TicketManager())
export const messageService = new MessageRepository(new MessageManager())