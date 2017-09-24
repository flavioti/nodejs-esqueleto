module.exports.listar = function (callback) {
    callback([
        { id: 1, nome: 'teste' }
    ])
}

module.exports.obterPorId = function (req, res, next) {
    next('NAO_IMPLEMENTADO')
}

module.exports.criar = function (req, res, next) {
    next('NAO_IMPLEMENTADO')
}

module.exports.atualizar = function (req, res, next) {
    next('NAO_IMPLEMENTADO')
}
