<template>
  <div class="home">
    <div class="content">
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

    <div class="chart">
      <la-artboard class="area" :padding="0" v-show="!$isServer" :height="300" autoresize :bound="[0, 20]" :data="values">
        <la-area :width="2" curve prop="value"></la-area>
      </la-artboard>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'home',

  methods: {
    random() {
      return Math.floor(Math.random() * 10) + 5;
    }
  },

  data: () => ({
    values: []
  }),

  created() {
    for (let i = 0; i < 7; i++) {
      this.values.push({
        value: this.random()
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
.home
  margin 0
  padding 0
  overflow hidden
  position relative

.wrap
  margin-top -150px

.content
  padding-left 20vw
  display flex
  align-items center
  height 100vh

.chart
  position absolute
  bottom 0
  left 0
  right 0
  z-index -1

.area>>>svg
  display block

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
  border-radius 4px
  font-size 18px
  color #fff
  padding 12px 16px
  cursor pointer
  outline none
  display inline-block
  text-decoration none
  border-bottom 4px solid #0b75b1

  &:hover
    opacity 0.8

  &:active
    background #0b75b1

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


