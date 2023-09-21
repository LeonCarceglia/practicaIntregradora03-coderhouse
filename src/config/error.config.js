import EnumErrors from "../services/errors/Enum.errors.js"

export default (error, req, res, next) => {
  req.logger.info(error.cause)
  switch (error.code) {
    case EnumErrors.INVALID_TYPES_ERROR:
      res.json({ status: "error", error: error.name })
      break

    default:
      res.json({ status: "error", error: "Unhandled error" })
  }
}
