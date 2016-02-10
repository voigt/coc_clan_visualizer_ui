var coc = {}

coc.data = function () {

  return new Promise((resolve, reject) => {

    var xmlhttp = new XMLHttpRequest()
    var url = 'http://localhost:8008/members'

    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        var data = []
        data = JSON.parse(xmlhttp.responseText)

        data.forEach(function (key, index) {
          key.trophies = '<a href="#!/member/' + key.name + '/trophies">' + key.trophies + '</a>'
          key.donations = '<a href="#!/member/' + key.name + '/donations">' + key.donations + '</a>'
          key.donationsReceived = '<a href="#!/member/' + key.name + '/donationsReceived">' + key.donationsReceived + '</a>'

        })

        // console.log(data)
        // console.log(data[0].name)
        // return data[0]
        resolve(data)
      } else {
        reject
      }
    }

    xmlhttp.open('GET', url, true)
    xmlhttp.send()

  })

}

export default coc
