<template>
  <table align="center">
    <thead>
      <tr>
        <th v-for="key in columns"
          @click="sortBy(key)"
          :class="{active: sortKey == key}">
          {{key | capitalize}}
          <span class="arrow"
            :class="sortOrders[key] > 0 ? 'asc' : 'dsc'">
          </span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="
        entry in data
        | filterBy filterKey
        | orderBy sortKey sortOrders[sortKey]">
        <td>
          <a href="#!/member/{{entry.name}}/level">{{{entry.level}}}</a>
        </td>
        <td>
          <a href="#!/member/{{entry.name}}/">{{{entry.name}}}</a>
        </td>
        <td>
          <a href="#!/member/{{entry.name}}/trophies" :item="hello">{{{entry.trophies}}}</a>
        </td>
        <td>
          <a href="#!/member/{{entry.name}}/donations">{{{entry.donations}}}</a> / <a href="#!/member/{{entry.name}}/donations">{{{entry.donationsReceived}}}</a>
        </td>
<!--        <td>
          <a href="#!/member/{{entry.name}}/donationsReceived">{{{entry.donationsReceived}}}</a>
        </td> -->
      </tr>
    </tbody>
  </table>
</template>


<script>
export default {
  props: {
    data: Array,
    columns: Array,
    filterKey: String
  },
  methods: {
    sortBy: function (key) {
      this.sortKey = key
      this.sortOrders[key] = this.sortOrders[key] * -1
    }
  },
  data () {
    var sortOrders = {}
    this.columns.forEach(function (key) {
      sortOrders[key] = 1
    })
    return {
      sortKey: '',
      sortOrders: sortOrders
    }
  }
}
</script>

<style>
table {
  border: 2px solid #42b983;
  border-radius: 3px;
  background-color: #fff;
}

th {
  background-color: #42b983;
  color: rgba(255,255,255,0.66);
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -user-select: none;
}

td {
  background-color: #f9f9f9;
}

th, td {
  min-width: 120px;
  padding: 10px 20px;
}

th.active {
  color: #fff;
}

th.active .arrow {
  opacity: 1;
}

.arrow {
  display: inline-block;
  vertical-align: middle;
  width: 0;
  height: 0;
  margin-left: 5px;
  opacity: 0.66;
}

.arrow.asc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 4px solid #fff;
}

.arrow.dsc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid #fff;
}
</style>