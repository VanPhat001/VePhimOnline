const express = require('express')
const router = express.Router()

const accountRouter = require('./account.route')
const phimRouter = require('./phim.route')
const suatChieuRouter = require('./suatChieu.route')
const veRouter = require('./ve.route')
const phongRouter = require('./phong.route')
const MySQL = require('../utils/MySQL')


router.use('/account', accountRouter)
router.use('/phim', phimRouter)
router.use('/suatChieu', suatChieuRouter)
router.use('/ve', veRouter)
router.use('/phong', phongRouter)

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

        console.log({ queryString1, queryString2, queryString3 })


        Promise.all(task1)
            .then(([phimResult, suatChieuResult, giaGheResult]) => {
                queryResult.phimResult = phimResult
                queryResult.suatChieuResult = suatChieuResult
                queryResult.giaGheResult = giaGheResult

                console.log({ queryResult })


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

                const data1 = `(${phongResult.map(phong => `'${phong.Phong_id}'`).join(',')})`
                const data2 = `(${phongResult.map(phong => `'${phong.Rap_id}'`).join(',')})`
                // console.log({data, data2})

                const queryString6 = `select * from Ghe where Phong_id in ${data1}`
                const queryString7 = `select * from Rap where Rap_id in ${data2}`
                // console.log(queryString6, queryString7)

                const task3 = [
                    MySQL.executeQuery(queryString6),
                    MySQL.executeQuery(queryString7)
                ]

                return Promise.all(task3)
            })
            .then(([gheResult, rapResult]) => {
                queryResult.gheResult = gheResult
                queryResult.rapResult = rapResult

                res.send(queryResult)
            })
            .catch(err => next(err))

    })

router.route('/info/doanhthu/:dateBegin/to/:dateEnd')
    .get(async (req, res, next) => {
        console.log('[GET] call revenueStatistics()');
        const { dateBegin, dateEnd } = req.params
        const queryString = `call revenueStatistics('${dateBegin}', '${dateEnd}')`

        try {
            const result = await MySQL.executeQuery(queryString)
            res.send(result[0])
        } catch (error) {
            next(error)
        }
    })

module.exports = router
