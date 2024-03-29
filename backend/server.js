const app = require('./app')
const MySQL = require('./app/utils/MySQL')

function startServer() { 
    try {
        MySQL.connect()
        console.log('Database connection established')

        app.listen(3000, () => console.log('Listening on http://localhost:3000'))
    } catch (error) {
        console.log(error)        
        process.exit()
    }
}
startServer()