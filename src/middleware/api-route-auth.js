/**
 * Functions here are no protected by token authentication
 */

const router = require("express").Router(),
    authController = require('../controller/api/authController')

router.use((req, res, next) => {
    next()
})

router.route('/login')
    .post(function (req, res, next) {
        authController.userLogin(req, res)
    })

router.route('/logout')
    .get(function (req, res, next) {
        authController.userLogout(req, res)
    })

module.exports = router
