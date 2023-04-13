export default {
    formatCurrency(money) {
        const config = { style: 'currency', currency: 'VND', maximumFractionDigits: 2 }
        return new Intl.NumberFormat('vi-VN', config).format(money);
    },

    formatDateToYearMonDay(date) {
        return date.toISOString().split('T')[0]
    }
}