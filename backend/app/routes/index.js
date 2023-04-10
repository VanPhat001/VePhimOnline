const express = require('express')
const router = express.Router()

const accountRouter = require('./account.route')
const phimRouter = require('./phim.route')
const suatChieuRouter = require('./suatChieu.route')

router.use('/account', accountRouter)
router.use('/phim', phimRouter)
router.use('/suatChieu', suatChieuRouter)

module.exports = router
