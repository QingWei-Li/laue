<template>
  <main class="main">
    <aside class="sidebar">
      <nav class="nav">
        <div class="brand">
          <nuxt-link class="logo" :to="`/${lang}`">Laue</nuxt-link>
        </div>
        <ul class="toc">1</ul>
      </nav>
    </aside>
    <section class="article">
      <nav class="navbar">
        <div class="search-wrap">
          <input type="search" name="search" class="search">
        </div>
        <ul>
          <li>
            <nuxt-link :to="`/${lang}guide`">Guide</nuxt-link>
          </li>
          <li>
            <nuxt-link :to="`/${lang}api`">API</nuxt-link>
          </li>
          <li>
            <nuxt-link :to="`/${lang}examples`">Examples</nuxt-link>
          </li>
        </ul>
      </nav>
      <article>
        <nuxt class="body"></nuxt>
      </article>
    </section>
  </main>
</template>

<script>
export default {
  computed: {
    lang() {
      const paths = this.$route.path.split('/').filter(o => o);

      return paths.length === 1 ? '' : `${paths[0]}/`;
    }
  }
};
</script>


<style src="~/styles/markdown.css"></style>
<style lang="stylus" scoped>
.main
  min-height 100vh
  background-color #3778ff

.sidebar
  color #fff
  position fixed
  width 40vw

  .nav
    width 220px
    float right

    .brand
      .logo
        font-size 30px
        text-decoration none
        color #fff

    .toc
      padding 60px 10px

.article
  margin-left 40vw
  background-color #fff
  box-shadow -10px -8px 12px 0 rgba(0, 23, 40, 0.08)
  min-height 100vh

  .body
    width 600px
    padding 70px 100px
    box-sizing content-box

  .navbar
    display flex
    padding 10px 0
    width 700px
    border-bottom 1px solid #78869c14

    .search-wrap
      flex auto

    ul
      display flex
      list-style none
      flex 1
      justify-content flex-end

      li
        padding 0 20px

        &:last-child
          padding-right 0

        a
          color #3778ff
          font-weight 500
          text-decoration none

          &.nuxt-link-active
            text-decoration underline

          &:hover
            opacity 0.8
            text-decoration underline
</style>


