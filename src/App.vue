<!--
 * @Author: your name
 * @Date: 2020-03-28 20:40:55
 * @LastEditTime: 2020-03-28 21:39:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \wh_mapping\src\App.vue
 -->
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang='less'>
@color: skyblue;
*{
  margin: 0;
}
#app {
  display: flex;
  height: 100vh;
  width: 100vw;
  background-color: @color;
}
</style>
