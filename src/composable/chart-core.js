import * as echarts from 'echarts'
import { onBeforeUnmount, watchEffect } from 'vue'

const useChart = ({ data }) => {
  let myChart = null
  const option = {
    title: {
      text: '種族值'
    },
    radar: {
      axisName: {
        formatter: '【{value}】',
        color: '#164e63'
      },
      indicator: [
        { name: 'HP', max: 200 },
        { name: 'Special Attack', max: 200 },
        { name: 'Special Defense', max: 200 },
        { name: 'Speed', max: 200 },
        { name: 'Defense', max: 200 },
        { name: 'Attack', max: 200 }
      ]
    },
    series: [{
      type: 'radar',
      label: {
        show: true
      },
      data: [
        {
          value: [20, 4, 19, 28, 3, 1 ]
        }
      ],
      areaStyle: {
        color: 'rgba(255, 228, 52, 0.6)'
      },
      dimensions: ['HP', 'Special Attack', 'Special Defense', 'Speed', 'Defense', 'Attack']
    }]
  }

  const resizeHandler = () => {
    myChart.resize()
  }

  const createChart = (target) => {
    myChart = echarts.init(target)
    myChart.setOption(option)
    watchEffect(() => {
      myChart.setOption({
        series: [{
          name: 'base',
          data: [{
            value: data.value
          }]
        }]
      })
    })
  }

  window.addEventListener('resize',resizeHandler)

  onBeforeUnmount(() => {
    window.removeEventListener('resize', resizeHandler)
    myChart.dispose()
  })

  return {
    createChart
  }
}

export {
  useChart
}