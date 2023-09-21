import userModel from "../dao/models/user.js"
import { userService } from "../services/index.js"

const registerUser = async (req, res) => {
  res.send({ status: "success", message: "User created" })
}

const loginUser = async (req, res) => {
  if (!req.user)
    return res.status(400).send({
      status: "failed",
      message: "User or password wrong",
    })
  req.session.user = req.user
  req.logger.info(req.session.user)
  res.send({ status: "success", payload: req.user })
}

const githubCallback = async (req, res) => {
  req.session.user = req.user
  res.redirect("/products")
}

const github = async (req, res) => { }

const updatePass = async (req, res) => {
  const { email, newPassword } = req.body
  const userUpdated = await userService.updatePass(email, newPassword)
  res.send({ status: "success", payload: userUpdated })
}

export default {
  registerUser,
  loginUser,
  githubCallback,
  github,
  updatePass
}