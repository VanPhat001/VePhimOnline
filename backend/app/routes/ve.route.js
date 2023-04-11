const express = require('express')
const router = express.Router()
const MySQL = require('../utils/MySQL')

router.route('/')
    .post(async (req, res, next) => {
        console.log('[POST] insert ve');
        const {Ve_thoiGianDat, CN_id, Ghe_id, SC_id} = req.body

        try {
            const queyrString = `call insertVe('${Ve_thoiGianDat}', ${CN_id}, ${Ghe_id}, ${SC_id})`
            const result = await MySQL.executeQuery(queyrString)
            res.send(result)
        } catch (error) {
            next(error)
        }
    })
module.exports = router