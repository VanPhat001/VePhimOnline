const express = require('express')
const router = express.Router()
const MySQL = require('../utils/MySQL')

router.route('/:id')
    .get(async (req, res, next) => {
        console.log('[GET] get movie by id');

        try {
            const queryString = `select * from Phim where Phim_id='${req.params.id}';`
            const result = await MySQL.executeQuery(queryString)
            res.send(result)
        } catch (error) {
            next(error)
        }
    })

module.exports = router