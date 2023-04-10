import utils from '../utils';

class ServiceProvider {
    constructor() {
        this.api = utils
    }

    async getAccount(username, password) {
        return (await this.api('account').post('/find', {
            username, password
        })).data
    }

    async createAccount({name, city, dateOfBirth, username, password, phoneNumber, role='user', avatar}) {
        return (await this.api('account').post('/', {
            name, city, dateOfBirth, username, password, phoneNumber, role, avatar
        })).data
    }

    async getAllSuatChieuByDate(dateFrom, dateTo) {
        return (await this.api('suatChieu').get(`/${dateFrom}/to/${dateTo}`)).data
    }
}

export default new ServiceProvider()