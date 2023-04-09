const config = {
    app: {
        port: process.env.PORT || 3000
    },
    db: {
        connectionObject: {
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || 'w3WRf&hv',
            database: process.env.DB_NAME || 'vephim'
        }
    }
}

module.exports = config