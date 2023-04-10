const MySQL = require('../utils/MySQL');

class AccountService {
    async findAccount(username, password) {
        const queryString = `call findAccount('${username}', '${password}')`

        console.log(queryString);
        return await MySQL.executeQuery(queryString)
    }
}

module.exports = AccountService