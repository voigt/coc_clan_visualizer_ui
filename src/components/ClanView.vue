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
import coc from '../data/index'

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
      msg: '',
      searchQuery: '',
      gridColumns: [ 'level', 'name', 'trophies', 'donations', 'donationsReceived'],
      gridData: []
    }
  },
  route: {
    data ({ to }) {
      // Promise sugar syntax: return an object that contains Promise fields.
      // http://router.vuejs.org/en/pipeline/data.html#promise-sugar
      // How To Make a Promise: http://stackoverflow.com/questions/30008114/how-do-i-promisify-native-xhr

      var url = 'http://coc.api.christophvoigt.com/members'

      return coc.request('GET', url)
              .then(function (e) {
                var daten = JSON.parse(e.target.response)

                return {
                  msg: 'KG10',
                  gridData: daten
                }
              }, function (e) {
                console.log('Something went wrong!')
              })
    }
  }
}
</script>

<style>
#search {
  margin-bottom: 10px;
}
</style>