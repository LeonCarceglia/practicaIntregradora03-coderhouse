import dotenv from "dotenv"

dotenv.config({
  path: process.env.ENVIRONMENT === "PRODUCTION" ? "./.env.production" : "./.env.development"
})

console.log("Environment:", process.env.ENVIRONMENT)
console.log("MongoDB URL:", process.env.MONGO_URL)
console.log("Port:", process.env.PORT)

export default {
  PORT: process.env.PORT || 8080,
  MONGODB_URL: process.env.MONGO_URL,
  ADMIN_USER: process.env.ADMIN_EMAIL,
  ADMIN_PASS: process.env.ADMIN_PASSWORD,
  ENVIRONMENT: process.env.ENVIRONMENT
}