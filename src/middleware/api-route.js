const router = require("express").Router(),
    authController = require('../controller/api/authController')

// Esse mediador é responsável por autenticar todas as requisições em /api
router.use('/auth', require('./api-route-auth'))

router.use(function configRes(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "same")
    res.setHeader('Content-Type', 'application/json')
    res.setHeader("Accept", "application/json")
    next()
})

router.use(function (req, res, next) {
    authController.authenticateToken(req, res, next)
})

router
    .use('/client', require('./api-route-client'))
// .use('/xpto', apiRouteXpto)

router.use(function (req, res, next) {
    // Se nenhuma das rotas acima responder a requisição devolve 404
    if (!res.headersSent)
        res.sendStatus(404)
})

module.exports = router
