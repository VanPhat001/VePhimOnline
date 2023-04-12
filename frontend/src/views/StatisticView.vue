<template>
    <div class="statistic-view">
        <canvas id="line-chart" class=""></canvas>


        <div class="row my-5">
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
                            <td>{{ info.doanh_thu }} vnd</td>
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

export default {

    data() {
        return {
            infos: [],
            totalRevenue: 0
        }
    },

    methods: {
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
        },

        renderLineChart({ data = [], labels = [], backgroundColor = [], borderColor = [] }) {
            const options = {
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            // Include a dollar sign in the ticks
                            callback: function (value, index, ticks) {
                                return value + ' vnd'
                            },
                        }
                    },
                }
            }
            this.renderChart({ data, labels, backgroundColor, borderColor, ctxId: 'line-chart', chartType: 'line', options })
        },

        renderCircleChart({ data = [], labels = [], backgroundColor = [], borderColor = [] }) {
            this.renderChart({ data, labels, backgroundColor, borderColor, ctxId: 'circle-chart', chartType: 'pie'})
        },

        getRandomRGBColor() {
            const r = Math.floor(Math.random() * 255)
            const g = Math.floor(Math.random() * 255)
            const b = Math.floor(Math.random() * 255)
            return `rgba(${r}, ${g}, ${b}, 0.2)`
        }
    },

    mounted() {
        serviceProvider.revenueStatistics('2023-1-1', '2023-12-31')
            .then(response => {
                console.log(response)

                const data = []
                const labels = []
                const backgroundColor = []
                // response.push({nam: 2024, thang: 1, doanh_thu: 100000})
                const isAddPrefix = response[0].nam != response[response.length - 1].nam

                this.totalRevenue = 0
                response.forEach(item => {
                    data.push(item.doanh_thu)

                    const label = (isAddPrefix ? `Năm ${item.nam} ` : '') + `Tháng ${item.thang}`
                    labels.push(label)

                    backgroundColor.push('' + this.getRandomRGBColor())

                    this.totalRevenue += item.doanh_thu
                })

                this.infos = response
                this.renderLineChart({ data, labels })
                this.renderCircleChart({ data, labels, backgroundColor })
            })
            .catch(err => console.log(err))
    }
}
</script>


<style lang="scss" scoped></style>