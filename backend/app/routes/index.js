const express = require('express')
const router = express.Router()

const accountRouter = require('./account.route')
const phimRouter = require('./phim.route')
const suatChieuRouter = require('./suatChieu.route')
const MySQL = require('../utils/MySQL')

router.use('/account', accountRouter)
router.use('/phim', phimRouter)
router.use('/suatChieu', suatChieuRouter)

router.route('/info/movie/:movieId/timeFrom/:timeFrom')
    .get((req, res, next) => {
        console.log('tong hop query');

        const movieId = req.params.movieId
        const timeFrom = req.params.timeFrom

        const queryString1 = `select * from Phim where Phim_id=${movieId}`
        const queryString2 = `select * from SuatChieu where Phim_id=${movieId} and SC_batDau>='${timeFrom}'`
        const queryString3 = `select * from GiaGhe`

        const queryResult = {}

        const task1 = [
            MySQL.executeQuery(queryString1),
            MySQL.executeQuery(queryString2),
            MySQL.executeQuery(queryString3)

        ]

        Promise.all(task1)
            .then(([phimResult, suatChieuResult, giaGheResult]) => {
                queryResult.phimResult = phimResult
                queryResult.suatChieuResult = suatChieuResult
                queryResult.giaGheResult = giaGheResult

                const phongId = suatChieuResult[0].Phong_id
                const suatChieuId = suatChieuResult[0].SC_id
                const queryString4 = `select * from Phong where Phong_id=${phongId}`
                const queryString5 = `select * from TrangThai where SC_id=${suatChieuId}`

                const task2 = [
                    MySQL.executeQuery(queryString4),
                    MySQL.executeQuery(queryString5)
                ]

                return Promise.all(task2)
            })
            .then(([phongResult, trangThaiResult]) => {
                queryResult.phongResult = phongResult
                queryResult.trangThaiResult = trangThaiResult

                const data = `[${phongResult.map(phong => `'${phong.Phong_id}'`).join(',')}]`
                console.log(data)

                res.send(queryResult)
            })
            .catch(err => next(err))

    })

module.exports = router
