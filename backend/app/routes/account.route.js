const express = require('express')
const router = express.Router()
const MySQL = require('../utils/MySQL')

router.route('/')
    .post(async (req, res, next) => {
        console.log('[POST] call insertConNguoi');
        try {
            let {name, city, dateOfBirth, username, password, phoneNumber, role, avatar} = req.body
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

module.exports = router


/*

    "name": "new_name", 
    "city": "new_city", 
    "dateOfBirth": "2020-2-2", 
    "username": "new_username", 
    "password": "new_password", 
    "phoneNumber": "new_phoneNumber", 
    "role": "user", 
    "avatar": "new_avatar",




*/ 