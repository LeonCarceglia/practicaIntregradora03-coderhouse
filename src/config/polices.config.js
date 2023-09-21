const handlePolicies = (policies) => {
    return (req, res, next) => {
      if (policies[0] === "PUBLIC") return next()
      if (!policies.includes(user.role.toUpperCase()))
      return res.status(403).send({ status: "error", error: "Forbidden" })
    }
}

export default {
    handlePolicies
}