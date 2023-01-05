import * as echarts from 'echarts'
import { onBeforeUnmount, onMounted, watchEffect } from 'vue'

const useChart = ({ data, target }) => {
  let myChart = null
  const option = {
    radar: {
      axisName: {
        formatter: '{value}',
        fontFamily: `Mona-Sans, Noto Sans TC`,
        color: '#164e63'
      },
      indicator: [
        { name: '血量', max: 300, min: 0 },
        { name: '特攻', max: 300, min: 0 },
        { name: '特防', max: 300, min: 0 },
        { name: '速度', max: 300, min: 0 },
        { name: '防禦', max: 300, min: 0 },
        { name: '攻擊', max: 300, min: 0 }
      ]
    },
    series: [{
      type: 'radar',
      label: {
        show: true,
        fontWeight: 'bolder',
        fontSize: 16,
        fontFamily: `Mona-Sans, Noto Sans TC`,
      },
      data: [
        {
          value: [1,1,1,1,1,1]
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

  const createChart = () => {
    myChart = echarts.init(target.value)
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

  onMounted(createChart)
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