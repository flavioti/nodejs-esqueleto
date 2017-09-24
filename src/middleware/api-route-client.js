const router = require("express").Router(),
    authController = require('../controller/api/authController'),
    clientApiController = require('../controller/api/clientController')

router.use((req, res, next) => {
    next()
})

router.route('/')
    .get(function (req, res, next) {
        // Validação de permissão comentada devido a necessidade de uso
        // na tela de relatórios
        // authController.authorize(req, res, next, ['VOUCHER_CAMPAIGN_MODULE'])
        authController.authorize(req, res, next, [])
    }, function (req, res, next) {
        campaignApiController.listAllCampaigns(req, res, next)
    })

    .post(function (req, res, next) {
        authController.authorize(req, res, next, ['VOUCHER_CAMPAIGN_MODULE'])
    }, function (req, res, next) {
        campaignApiController.updateOrCreateCampaign(req, res, next)
    })

router.route('/:id')
    .get(function (req, res, next) {
        authController.authorize(req, res, next, ['VOUCHER_CAMPAIGN_MODULE'])
    }, function (req, res, next) {
        campaignApiController.getCampaignById(req, res, next)
    })

router.use((req, res, next) => {
    next()
})

module.exports = router
