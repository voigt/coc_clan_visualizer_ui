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

coc.trophies = function (data){
  var helper = {
    labels: [],
    series: [[]]
  }

  var loop = JSON.parse(data)

  loop.forEach(function (dataset, index) {
    if (index % 24 === 0 && helper.labels.length < 14){
      helper.labels.push(formatDate(dataset.date))
      helper.series[0].push(dataset.trophies)
    }
  })

  return helper
}

export default coc
