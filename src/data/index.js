import Moment from '../../node_modules/moment/moment.js'

var coc = {}

var TYPES = {
    'undefined'        : 'undefined',
    'number'           : 'number',
    'boolean'          : 'boolean',
    'string'           : 'string',
    '[object Function]': 'function',
    '[object RegExp]'  : 'regexp',
    '[object Array]'   : 'array',
    '[object Date]'    : 'date',
    '[object Error]'   : 'error'
  },
  TOSTRING = Object.prototype.toString;

function type(o) {
  return TYPES[typeof o] || TYPES[TOSTRING.call(o)] || (o ? 'object' : 'null');
};

coc.request = function (method, url) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest()
    xhr.open(method, url)
    xhr.onload = resolve
    xhr.onerror = reject
    xhr.send()
  })
}

var formatDate = function (unix) {
  return Moment.unix(unix.toString()).format("DD.MM.YY")
}

coc.extractData = function (data, stats){
  var helper = {
    labels: [],
    series: [[]]
  }

  var loop = JSON.parse(data)

  if (stats === 'level') {

    loop.forEach(function (dataset, index) {
      if (index % 24 === 0 && helper.labels.length < 14){
        helper.labels.push(formatDate(dataset.date))
        helper.series[0].push(dataset.trophies)
      }
    })

  }

  if (stats === 'trophies') {

    loop.forEach(function (dataset, index) {
      if (index % 24 === 0 && helper.labels.length < 14){
        helper.labels.push(formatDate(dataset.date))
        helper.series[0].push(dataset.trophies)
      }
    })

  }

  if (stats === 'donations') {
    helper.series.push([])

    loop.forEach(function (dataset, index) {

      if (index % 24 === 0 && helper.labels.length < 14){
        helper.labels.push(formatDate(dataset.date))
        helper.series[0].push(dataset.donations)
        helper.series[1].push(dataset.donationsReceived)

      }
    })
  }

  if (stats === '') {
    helper.series.push([])
    helper.series.push([])

    loop.forEach(function (dataset, index) {

      if (index % 24 === 0 && helper.labels.length < 14){
        helper.labels.push(formatDate(dataset.date))
        helper.series[0].push(dataset.trophies)
        helper.series[1].push(dataset.donations)
        helper.series[2].push(dataset.donationsReceived)
      }

    })
  }

  return helper
}

export default coc
