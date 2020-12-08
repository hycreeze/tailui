<template>
  <div class="counter">
    计时器：{{ counter }}
    <tail-button type="danger" :loading="true" size="large">提交</tail-button>
  </div>
</template>

<script>


export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data () {
    return {
      counter: 0
    }
  },
  mounted() {
    setInterval(() => {
      this.counter--;
    }, 1000)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
