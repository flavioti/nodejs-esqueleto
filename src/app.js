exports.initialize = function () {

    const express = require("express"),
        bodyParser = require("body-parser")

    const PORT = 8080

    const app = express()

    app.use(bodyParser.json())

    app.use(bodyParser.urlencoded({
        extended: true
    }))

    // Melhor usar Nunjucks :) Mudo assim que possível
    app.set("view engine", "ejs")

    // Rotas estáticas sempre devem ser declaradas antes das dinâmicas (Não sei o porque)
    app.use('/node_modules', express.static('node_modules'))

    // Rodas que fornecem somente dados
    app.use('/api', require('./middleware/api-route'))

    // Rodas que fornecem html
    app.use('/', require('./middleware/view-route'))

    app.set('packageVersion', require("../package.json").version)
    app.disable('x-powered-by')

    // Mediador de erros A
    // Intercepta e registra erros
    app.use(function logErrors(err, req, res, next) {
        // logger.error(err)
        console.log(err)
        next(err)
    })

    // Mediador de erros B
    // Evita que um erro envie ao cliente dados sensíveis
    // Esse é o ultimo recurso para gerenciamento de erros e deve ser evitada
    app.use(function (err, req, res, next) {
        if (req.xhr) {
            // Qualquer erro não tratado, retorna INTERNAL_SERVER_ERROR
            res.status(500).send({ error: err })
        } else {
            // Quanto não for xhr, encaminha para próximo tratamento de erro
            // que renderiza uma página ao invés de somente responder com JSON
            //  it will be handled by the built-in error handler; the error will be written to the client with the stack trace. 
            // The stack trace is not included in the production environment
            next(err)
        }
    })

    // Mediador de erros C
    // Renderiza pagina de erro (Se essa função está sendo invocada, seu código
    // precisa de um melhor tratamento de erro pois essa é ultima opção)
    app.use(function errorHandler(err, req, res, next) {
        res.status(500)
        // Somente entrega o erro completo no ambiente de desenvolvimento
        if (process.env.NODE_ENV == 'production') {
            res.render('error', {
                message: err.message,
                stack: ''
            })
        } else {
            res.render('error', {
                message: err.message || err,
                stack: err.stack
            })
        }
    })

    app.listen(PORT, () => {
        console.log(`Listening on ${PORT}`)
    })

}
