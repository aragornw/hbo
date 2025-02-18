<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    if(document.getElementById('Loading')){
      document.body.removeChild(document.getElementById('Loading'))   // 加载页面完后移除加载动画
    }
  }
}
</script>
