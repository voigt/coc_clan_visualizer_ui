<template>
  <div>
    <div>this is template body</div>
    <p>{{ name }}</p>
    <div class="ct-chart ct-perfect-fourth"></div>
  </div>

</template>

<script>
  export default{
    props: {
      name: String,
//      chartData: Array
    },
    data () {
      return {
        msg: 'hello vue'
        // chartData: {}
      }
    }
  }
</script>

<style>

</style>
