<template>
  <div class="home">
    <div class="wrap">
      <h1>Laue</h1>
      <p>Modern charts for Vue.js</p>
      <div class="group">
        <nuxt-link class="button" to="/guide">Getting Started</nuxt-link>
      </div>
      <footer>
        <a href="https://github.com/qingwei-li/laue">GitHub</a>
        <a href="https://twitter.com/cinwell_li">@cinwell_li</a>
        <div>Released under the MIT License</div>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'home'
};
</script>

<style lang="stylus" scoped>
.home
  padding 0 20vw
  display flex
  align-items center
  height 100vh

.wrap
  margin-top -100px

h1
  font-size 50px
  color #0d2b3e
  margin 0 0 30px 0

p
  font-size 22px
  color #373e42
  margin-bottom 26px
  opacity 0.8

.button
  background #0e99e5
  border-radius 3px
  font-size 18px
  color #fff
  padding 14px 16px
  cursor pointer
  outline none
  display inline-block
  text-decoration none

footer
  margin-top 30px
  opacity 0.5

  a
    color #373e42
    text-decoration none

    &:first-child::after
      content ''
      border-right 1px solid #373e42
      height 10px
      display inline-block
      margin 0 10px

  div
    margin-top 10px
    color #373e42
</style>


