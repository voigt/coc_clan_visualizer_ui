<template>
  <div class="grid">
    <h1>{{ msg }}</h1>
    <form id="search">
      <input name="query" v-model="searchQuery">
    </form>
    <member-view
      :data="gridData"
      :columns="gridColumns"
      :filter-key="searchQuery">
    </member-view>
  </div>
</template>

<script>
// import coc from '../data'
import MemberView from './MemberView'

export default {
  components: {
    MemberView
  },
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      msg: 'Not loaded yet',
      searchQuery: '',
      gridColumns: [ 'level', 'name', 'trophies', 'donations', 'donationsReceived'],
      gridData: []
    }
  },
  asyncData: (resolve, reject) => {
    // load data and call resolve(data)
    // or call reject(reason) if something goes wrong

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

        resolve({
          msg: 'KG10',
          gridData: data
        })
      }
    }

    xmlhttp.open('GET', url, true)
    xmlhttp.send()

  }
}
</script>

<style>
#search {
  margin-bottom: 10px;
}
</style>