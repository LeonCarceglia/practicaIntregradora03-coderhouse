import CustomRouter from "./router.js"
import passport from "passport"
import userController from "../controllers/users.controller.js"

export default class SessionRouter extends CustomRouter {
  init() {

    this.post(
      "/register", ["PUBLIC"],
      passport.authenticate("register", { failureRedirect: "/failureRedirect" }),
      userController.registerUser)

    this.post(
      "/login", ["PUBLIC"],
      passport.authenticate("login", { failureRedirect: "/failureRedirect" }),
      userController.loginUser)

    this.get("/github", ["PUBLIC"], passport.authenticate("github"), userController.github)

    this.get(
      "/githubcallback", ["PUBLIC"],
      passport.authenticate("github"),
      userController.githubCallback)

    this.post("/updatePass", ["PUBLIC"], userController.updatePass)
  }

}

