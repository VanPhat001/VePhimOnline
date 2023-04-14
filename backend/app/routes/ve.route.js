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

router.route('/:CN_id')
    .get(async (req, res, next) => {
        console.log('[GET] get ve by ve id')
        try {

            // const queyrString = `select * from ve where ve_id = ${req.params.CN_id};`
            const queyrString = `select v.*, p.Phim_ten, sc.SC_batDau from ve as v
            inner join suatchieu as sc on v.sc_id = sc.sc_id
            inner join phim as p on p.phim_id = sc.phim_id
            where cn_id = ${req.params.CN_id} 
            order by Ve_thoiGianDat;`
            const result = await MySQL.executeQuery(queyrString)
            res.send(result)
        } catch (error) {
            next(error)
        }


    })

module.exports = router