<template>
  <main class="main">
    <aside class="sidebar">
      <nav class="nav">
        <div class="brand">
          <nuxt-link class="logo" :to="`/${lang}`">Laue</nuxt-link>
        </div>
        <div v-html="toc" class="toc"></div>
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
      <article ref="article">
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
  },

  data: () => ({
    toc: ''
  }),

  provide() {
    return {
      page: this
    };
  }
};
</script>


<style src="~/styles/markdown.css"></style>
<style lang="stylus" scoped>
.main
  min-height 100vh
  background-color #f9f9f9

.sidebar
  color #0d2b3e
  position fixed
  width 33vw

  .nav
    width 220px
    float right

    .brand
      padding 10px 0

      .logo
        font-size 30px
        text-decoration none
        color #0d2b3e

    .toc
      padding 76px 10px

.article
  margin-left 33vw
  background-color #fff
  box-shadow -10px -8px 12px 0 rgba(0, 23, 40, 0.08)
  min-height 100vh

  .body
    max-width 600px
    padding 70px 0
    margin-left 100px
    box-sizing content-box

  .navbar
    display flex
    padding 20px 0
    max-width 700px
    border-bottom 1px solid #78869c14

    .search-wrap
      flex auto

    ul
      display flex
      list-style none

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

@media screen and (max-width: 700px)
  .sidebar
    display none

  .article
    margin-left 0

    .body
      padding 0 20px
      margin-left 0
</style>
