const express = require('express')
const router = express.Router()
const MySQL = require('../utils/MySQL')

router.route('/')
    .post(async (req, res, next) => {
        console.log('[POST] call insertConNguoi')

        try {
            let { name, city, dateOfBirth, username, password, phoneNumber, role, avatar } = req.body
            avatar = avatar || 'https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745'

            const queryString = `call insertConNguoi('${name}','${city}','${dateOfBirth}','${username}','${password}','${phoneNumber}','${role}','${avatar}');`
            const result = await MySQL.executeQuery(queryString)
            res.send(result[0])
        } catch (error) {
            next(error)
        }
    })

router.route('/find')
    .post(async (req, res, next) => {
        console.log('[POST] call getAccount');
        const { username, password } = req.body

        try {
            const queryString = `call getAccount('${username}', '${password}');`
            const result = await MySQL.executeQuery(queryString)
            res.send(result[0])
        } catch (error) {
            next(error)
        }
    })


router.route('/:id')
    .get(async (req, res, next) => {
        console.log('[GET] call getAccountById')

        try {
            const queryString = `call getAccountById('${req.params.id}');`
            const result = await MySQL.executeQuery(queryString)
            res.send(result[0])
        } catch (error) {
            next(error)
        }

    })
    .patch(async (req, res, next) => {
        console.log('[PATCH] update account')

        Object.keys(req.body).forEach(key => {
            if (req.body[key] === undefined || req.body[key] === null) {
                delete req.body[key]
            }
        })

        const updateParams = Object.keys( req.body).map(key => `${key}='${req.body[key]}'`).join(', ')
        const queryString = `update ConNguoi set ${updateParams} where CN_id=${req.params.id};`
        try {
            const result = await MySQL.executeQuery(queryString)
            res.send(result)
        } catch (error) {
            next(error)
        }
    })

module.exports = router

