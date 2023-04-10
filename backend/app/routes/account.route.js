const express = require('express')
const router = express.Router()

const AccountService = require('../services/account.service')
const accountService = new AccountService()

router.route('/find')
    .post(async (req, res, next) => {
        const { username, password } = req.body
        try {
            res.send(await accountService.findAccount(username, password))            
        } catch (error) {
            next(error)
        }
    })

module.exports = router