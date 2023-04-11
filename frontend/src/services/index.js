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

    async getAccountById(id) {
        return (await this.api('account').get(`/${id}`)).data
    }

    async createAccount({name, city, dateOfBirth, username, password, phoneNumber, role='user', avatar}) {
        return (await this.api('account').post('/', {
            name, city, dateOfBirth, username, password, phoneNumber, role, avatar
        })).data
    }

    async updateAccount(id, {name, city, dateOfBirth, username, password, phoneNumber, role, avatar}) {
        return (await this.api('account').patch(`/${id}`, {
            CN_hoTen : name, 
            CN_thanhPho : city, 
            CN_ngaySinh : dateOfBirth, 
            CN_userName: username, 
            CN_passWord : password, 
            CN_sdt : phoneNumber, 
            CN_phanQuyen : role, 
            CN_avatar : avatar,
        })).data
    }

    async getAllSuatChieuByDate(dateFrom, dateTo) {
        return (await this.api('suatChieu').get(`/${dateFrom}/to/${dateTo}`)).data
    }

    async getPhimById(movieId) {
        return (await this.api('phim').get(`/${movieId}`)).data
    }

    async getAllPhim() {
        return (await this.api('phim').get('/')).data
    }

    async getPhimInfoToBookTicket(movieId, timeFrom) {
        return (await this.api('info').get(`/movie/${movieId}/timeFrom/${timeFrom}`)).data
    }

    async getAllPhong() {
        return (await this.api('phong').get('/')).data
    }

    async insertPhim({ Phim_ten, Phim_doTuoi, Phim_moTa, Phim_theLoai, Phim_poster }) {
        return (await this.api('phim').post('/', {
            Phim_ten, Phim_doTuoi, Phim_moTa, Phim_theLoai, Phim_poster
        })).data
    }

    async insertVe({Ve_thoiGianDat, CN_id, Ghe_id, SC_id}) {
        return (await this.api('ve').post('/', {
            Ve_thoiGianDat, CN_id, Ghe_id, SC_id
        })).data
    }
}

export default new ServiceProvider()