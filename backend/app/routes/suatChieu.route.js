const express = require('express')
const router = express.Router()
const MySQL = require('../utils/MySQL')

router.route('/:dateFrom/to/:dateTo')
    .get(async (req, res, next) => {
        const { dateFrom, dateTo } = req.params
        try {
            const queryString = `call getAllSuatChieuByDate('${dateFrom}', '${dateTo}');`
            const result = await MySQL.executeQuery(queryString)
            res.send(result[0])
        } catch (error) {
            next(error)
        }
    })

module.exports = router