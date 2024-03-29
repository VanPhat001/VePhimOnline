const express = require('express')
const router = express.Router()
const MySQL = require('../utils/MySQL')

router.route('/')
    .get(async (req, res, next) => {
        console.log('[GET] get all movies')

        try {
            const queryString = `select * from Phim`
            const result = await MySQL.executeQuery(queryString)
            res.send(result)
        } catch (error) {
            next(error)
        }
    })
    .post(async (req, res, next) => {
        console.log('[POST] insert movie')
        const { Phim_ten, Phim_doTuoi, Phim_moTa, Phim_theLoai, Phim_poster } = req.body

        try {
            const queryString = `call insertPhim('${Phim_ten}', ${Phim_doTuoi}, '${Phim_moTa}', '${Phim_theLoai}', '${Phim_poster}')`
            console.log(queryString);
            const result = await MySQL.executeQuery(queryString)
            res.send(result)
        } catch (error) {
            next(error)
        }
    })

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
    .delete(async (req, res, next) => {
        console.log('[DELETE] delete phim by id')
        const {id: Phim_id} = req.params

        try {
            const queryString = `delete from Phim where Phim_id = ${Phim_id}`
            const result = await MySQL.executeQuery(queryString)
            res.send(result)
        } catch (error) {
            next(error)
        }
    })

module.exports = router