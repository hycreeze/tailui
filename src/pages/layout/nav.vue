<template>
  <div class="left-nav">
    213123
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue';
  export default defineComponent({
    name: 'LeftNav',
    props: {

    },
    setup (props, ctx) {
      const menuList = [
        {id: 1, name: 'Home', path: '/', icon: 'home'},
        {id: 2, name: 'MyTask', path: '/task', icon: 'task'},
        {id: 3, name: 'Recent', path: '/recent', icon: 'recent'},
      ];

      return menuList
    }
  })

</script>