const express = require('express')
const router = express.Router()
const MySQL = require('../utils/MySQL')


router.route('/')
    .post(async (req, res, next) => {
        console.log('[POST] insert showtime')
        const { Phong_id, Phim_id, SC_batDau, SC_ketThuc, SC_gia } = req.body

        try {
            const queryString = `call insertSuatChieu(${Phong_id}, ${Phim_id}, '${SC_batDau}', '${SC_ketThuc}', ${SC_gia});`
            const result = await MySQL.executeQuery(queryString)
            res.send(result[0])
            // res.send(queryString)
        } catch (error) {
            next(error)
        }
    })

router.route('/:dateFrom/to/:dateTo')
    .get(async (req, res, next) => {
        console.log('[GET] get all showtime between dateFrom to dateTo')
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