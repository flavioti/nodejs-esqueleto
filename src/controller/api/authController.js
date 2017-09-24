const request = require('request'),
    jwt = require('jwt-simple')

module.exports.userLogin = function (req, res) {
    // validações aqui e devolvo o token
    // jwt.encode({
    //     admin: true,
    //     nome: 'flavio'
    // })
    let carga = {}
    res.send({
        data: carga
    })
}

module.exports.userLogout = function (req, res) {
    if (req.xhr) {
        // res.sendStatus(200)
        res.sendStatus(401)
    } else {
        // res.status(200)
        // return res.redirect("/login")
        res.status(401).redirect("/login")
    }
}

module.exports.authenticateToken = function (req, res, next) {
    // aqui o token deve ser desenpacotado
    // Geralmente coloco o conteudo no req, ai posso acessar a qualqier momento
    // req.dadosUsuario = jwt.decode(req.body.token)
    next()
}

module.exports.authorize = function (req, res, next, requiredPermssion) {
    // Aqui deve ser verificado se o usuário tem permissão para a ação solicitada
    next()
}
