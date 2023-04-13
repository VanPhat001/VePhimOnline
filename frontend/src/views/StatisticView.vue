<template>
    <div class="statistic-view">

        <div class="row mt-4">
            <div class="col">
                <label for="">Từ</label>
                <input type="month" class="form-control" v-model="timeStartString">
            </div>
            <div class="col">
                <label for="">Đến</label>
                <input type="month" class="form-control" v-model="timeEndString">
            </div>
        </div>
        <div class="row mt-3">
            <div class="col">
                <button class="btn btn-primary px-5" @click="onStatisticButtonClick">Thống kê</button>
            </div>
        </div>

        <div class="row mt-3" :class="{ 'invisible': totalRevenue == 0 }">
            <div class="col">
                <canvas id="line-chart" class="mt-3"></canvas>
            </div>
        </div>

        <div class="row my-5" :class="{ 'invisible': totalRevenue == 0 }">
            <div class="col d-flex">
                <table class="table my-auo">
                    <thead>
                        <tr class="text-center">
                            <th scope="col">Năm</th>
                            <th scope="col">Tháng</th>
                            <th scope="col">Doanh thu</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="text-center" v-for="(info, index) in infos" :key="index">
                            <th scope="row">{{ info.nam }}</th>
                            <td>{{ info.thang }}</td>
                            <td>{{ formatCurrency(info.doanh_thu) }}</td>
                            <td>{{ (info.doanh_thu / totalRevenue * 100).toFixed(2) }}%</td>
                        </tr>
                    </tbody>
                </table>

            </div>
            <div class="col-4 d-flex">
                <canvas id="circle-chart" class="m-auto"></canvas>
            </div>
        </div>

    </div>
</template>


<script>
import Chart from 'chart.js/auto'
import serviceProvider from '../services'
import utils from '../utils/public.util';

export default {

    data() {
        return {
            timeStartString: '2023-01',
            timeEndString: '2023-01',
            infos: [],
            totalRevenue: 0,
            chart: {
                line: null,
                circle: null
            }
        }
    },

    methods: {
        getRandomRGBColor() {
            const r = Math.floor(Math.random() * 255)
            const g = Math.floor(Math.random() * 255)
            const b = Math.floor(Math.random() * 255)
            return `rgba(${r}, ${g}, ${b}, 0.2)`
        },

        formatCurrency: utils.formatCurrency,

        renderChart({ data = [], labels = [], backgroundColor = [], borderColor = [], ctxId = '', chartType = 'line', options = {} }) {
            const ctx = document.getElementById(ctxId)
            const myChart = new Chart(ctx, {
                type: chartType,
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Doanh thu',
                        data: data,
                        backgroundColor: backgroundColor,
                        borderColor: borderColor,
                        borderWidth: 1
                    }]
                },
                options,
            })
            return myChart
        },

        renderLineChart({ data = [], labels = [], backgroundColor = [], borderColor = [] }) {
            const options = {
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            // Include a dollar sign in the ticks
                            callback: (value, index, ticks) => {
                                // return value + ' vnd'
                                return this.formatCurrency(value)
                            },
                        }
                    },
                }
            }

            if (this.chart.line) {
                this.chart.line.destroy()
            }

            this.chart.line = this.renderChart({ data, labels, backgroundColor, borderColor, ctxId: 'line-chart', chartType: 'line', options })
        },

        renderCircleChart({ data = [], labels = [], backgroundColor = [], borderColor = [] }) {
            if (this.chart.circle) {
                this.chart.circle.destroy()
            }

            this.chart.circle = this.renderChart({ data, labels, backgroundColor, borderColor, ctxId: 'circle-chart', chartType: 'pie' })
        },

        init(statistic) {
            const data = []
            const labels = []
            const backgroundColor = []
            // statistic.push({nam: 2024, thang: 1, doanh_thu: 100000})
            const isAddPrefix = statistic[0].nam != statistic[statistic.length - 1].nam

            this.totalRevenue = 0
            statistic.forEach(item => {
                data.push(item.doanh_thu)

                const label = (isAddPrefix ? `Năm ${item.nam} ` : '') + `Tháng ${item.thang}`
                labels.push(label)

                backgroundColor.push('' + this.getRandomRGBColor())

                this.totalRevenue += item.doanh_thu
            })

            this.renderLineChart({ data, labels })
            this.renderCircleChart({ data, labels, backgroundColor })
            this.infos = statistic
        },

        getLastDayOfMonth(month, year) {
            return new Date(new Date(year, month, 1) - 1).toString().split(' ')[2] * 1
        },

        onStatisticButtonClick() {
            if (Date.parse(this.timeStartString) > Date.parse(this.timeEndString))
            {
                alert('Time start must be less than time end')
                return
            }

            const [year, month] = this.timeEndString.split('-')
            const timeStart = this.timeStartString + '-01'
            const timeEnd = this.timeEndString + `-${this.getLastDayOfMonth(month, year)}`
            // console.log({timeStart, timeEnd, month, year})

            serviceProvider.revenueStatistics(timeStart, timeEnd)
                .then(response => {
                    console.log(response)
                    this.init(response)
                })
                .catch(err => console.log(err))
        }
    },

    mounted() {
        const year = new Date().getFullYear()
        this.timeStartString = `${year}-01`
        this.timeEndString = `${year}-12`


        // serviceProvider.revenueStatistics('2023-1-1', '2023-12-31')
        //     .then(response => {
        //         console.log(response)
        //         this.init(response)
        //     })
        //     .catch(err => console.log(err))
    }
}
</script>


<style lang="scss" scoped></style>