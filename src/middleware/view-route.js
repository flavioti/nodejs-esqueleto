const router = require("express").Router(),
    request = require("request"),
    clientController = require("../controller/api/clientController")

router.use(function configRes(req, res, next) {
    next()
})

router
    // Rota usada pelo loadbalance para testar a saude da instancia
    .get("/health", (req, res, next) => {
        res.sendStatus(204)
        return
    })

    .get("/login", function (req, res, next) {
        // loginController.fazerLogin()...
        res.render("login")
    })
    .get("/client", function (req, res, next) {
        clientController.listar(function (lista) {
            res.render("client", lista)
        })
    })

    .get("/401", (req, res, next) => res.status(401).render("401"))
    .get("/403", (req, res, next) => res.status(403).render("403"))
    .get("/404", (req, res, next) => res.status(404).render("404"))

    .all('/*', (req, res, next) => res.redirect('/login'))

router.use((req, res, next) => {
    // Se nenhuma das rotas acima responder a requisição devolve 404
    if (!res.headersSent)
        res.sendStatus(404)
})

module.exports = router
