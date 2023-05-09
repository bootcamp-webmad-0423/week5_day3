const express = require('express')
const { isLoggedIn, checkRoles } = require('../middlewares/route-guard')
const router = express.Router()


// profile page
router.get("/perfil", isLoggedIn, (req, res, next) => {
  res.render("user/profile", { user: req.session.currentUser })
})


// admin page (PROTECTED & ROLE BASED ACCESS)
router.get("/admin", isLoggedIn, checkRoles('ADMIN', 'EDITOR'), (req, res, next) => {
  res.render("user/admin-page")
})

module.exports = router