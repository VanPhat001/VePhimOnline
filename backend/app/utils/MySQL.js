const mysql = require('mysql')
const config = require('../config')

class MySQL {
    static connect() {
        if (this.conn) return this.conn

        this.conn = mysql.createConnection(config.db.connectionObject)
        this.conn.connect(err => {
            if (err) {
                this.conn = null
                throw err
            }

            return this.conn
        })
    }

    static executeQuery(queryString) {
        return new Promise((resolve, reject) => {
            this.conn.query(queryString, (err, results) => {
                if (err) reject(err)
                resolve(results)
            })
        })
    }
}

module.exports = MySQL