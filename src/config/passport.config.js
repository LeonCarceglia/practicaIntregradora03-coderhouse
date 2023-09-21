import passport from "passport"
import local from "passport-local"
import { userService } from "../services/index.js"
import { cartService } from "../services/index.js"
import GitHubStrategy from "passport-github2"
import { createHash, isValidPassword } from "../utils.js"
import config from "./config.js"

const localStrategy = local.Strategy

const initializePassport = () => {
  passport.use(
    "register",
    new localStrategy(
      {
        usernameField: "email",
        passReqToCallback: true,
      },
      async (req, username, password, done) => {
        const { first_name, last_name, email, age } = req.body
        try {
          const user = await userService.existUser(email)
          if (user) {
            return done(null, false, { message: "User already exists" })
          }
          const newUser = {
            first_name,
            last_name,
            email,
            password: createHash(password),
            cart: await cartService.createCart([]),
            age
          }
          if (username === config.ADMIN_USER && password === config.ADMIN_PASS) {
            req.session.admin = true
            newUser.role = "admin"
          }
          const result = await userService.createUser(newUser)
          return done(null, result)
        } catch (error) {
          return done("Error getting user" + error)
        }
      }
    )
  )

  passport.use(
    "login",
    new localStrategy(
      {
        usernameField: "email",
      },
      async (username, password, done) => {
        try {
          const user = await userService.existUser(username)
          if (!user) {
            return done(null, false, { message: "User not found" })
          }
          if (!isValidPassword(user, password)) {
            return done(null, false, { message: "Wrong password" })
          }
          return done(null, user)
        } catch (error) {
          return done("Error getting user" + error)
        }
      }
    )
  )

  passport.use(
    "github",
    new GitHubStrategy(
      {
        clientID: "Iv1.7c171e89c09de2b6",
        clientSecret: "e18a0a0532072422c192585fd425dda395ae0812",
        callbackURL: "http://localhost:3000/api/sessions/githubcallback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const user = await userService.existUser(profile._json.email)
          if (!user) {
            const newUser = {
              first_name: profile._json.name.split(" ")[0],
              last_name: profile._json.name.split(" ")[2],
              email: profile._json.email,
              password: "",
            }
            const result = await userService.createUser(newUser)
            return done(null, result)
          } else {
            return done(null, user)
          }
        } catch (error) {
          return done("Error getting user" + error)
        }
      }
    )
  )

  passport.serializeUser((user, done) => {
    done(null, user._id)
  })

  passport.deserializeUser(async (id, done) => {
    const user = userService.getUser(id)
    done(null, user)
  })
}

export default initializePassport
