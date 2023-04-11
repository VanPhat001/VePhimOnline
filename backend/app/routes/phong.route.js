const express = require('express')
const router = express.Router()
const MySQL = require('../utils/MySQL')

router.route('/')
    .get(async (req, res, next) => {
        console.log('[GET] get all phong')

        try {
            const queryString = `select * from Phong`
            const result = await MySQL.executeQuery(queryString)
            res.send(result)
        } catch (error) {
            next(error)
        }
    })

module.exports = router