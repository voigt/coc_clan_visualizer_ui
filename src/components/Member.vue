<template>
  <div>
    <h1> {{member}}</h1>
    <chartist
            id-chart="ct-chart"
            type="Line"
            :data="chartData"
            :options="chartOptions" >
    </chartist>
    <!--
    <chart
            :name="member"
            :chart-data="chartData">
    </chart>
    -->
  </div>
</template>

<script>
  // import Chart from './Chart'
  import Chartist from '../../node_modules/chartist-vuejs/index.js'
  import coc from '../data/index'

  export default {
    components: {
      Chartist
    },
    props: {},
    data () {
      return {
        msg: '',
        member: '',
        chartData: {
          labels: [],
          series: [[]]
        },
        chartOptions: {
          lineSmooth: true,
          width: '100%',
          height: 400
        }
      }
    },
    route: {
      data ({ to }) {
        // Promise sugar syntax: return an object that contains Promise fields.
        // http://router.vuejs.org/en/pipeline/data.html#promise-sugar
        // How To Make a Promise: http://stackoverflow.com/questions/30008114/how-do-i-promisify-native-xhr

        var url = 'http://coc.api.christophvoigt.com/member/' + to.params.name

        return coc.request('GET', url)
                .then(function (e) {
                  var daten = coc.trophies(e.target.response)

                  // console.log(daten)

                  return {
                    member: to.params.name + '\'s trophies',
                    chartData: daten
                  }
                }, function (e) {
                  console.log('Something went wrong!')
                })
      }
    }
  }
</script>

<style>
body {
  font-family: Helvetica, sans-serif;
}
</style>
