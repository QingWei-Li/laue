<template>
  <main class="main">
    <github slug="qingwei-li/laue"></github>
    <aside class="sidebar">
      <nav class="nav">
        <div class="brand">
          <nuxt-link class="logo" :to="`/${lang}`">Laue</nuxt-link>
        </div>
        <div ref="toc" v-html="toc" class="toc"></div>
        <a class="back2top" href="#">Back to top</a>
      </nav>
    </aside>
    <section class="article">
      <nav class="navbar">
        <!-- <div class="search-wrap">
          <input type="search" name="search" class="search">
        </div> -->
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
import github from 'vue-github-badge';

export default {
  computed: {
    lang() {
      const paths = this.$route.path.split('/').filter(o => o);

      return paths.length === 1 ? '' : `${paths[0]}/`;
    }
  },

  components: {
    github
  },

  data: () => ({
    toc: ''
  }),

  provide() {
    return {
      page: this
    };
  },

  mounted() {
    let last;
    this.$refs.toc.addEventListener('click', e => {
      if (e.target.tagName === 'A') {
        if (last) {
          last.classList.remove('active');
        }
        last = e.target;
        e.target.classList.add('active');
      }
    });

    const id = decodeURIComponent(this.$route.hash);

    if (id) {
      const target = this.$el.querySelector(id);

      if (target) {
        this.$nextTick(() => {
          const docEl = document.documentElement;
          const docRect = docEl.getBoundingClientRect();
          const elRect = target.getBoundingClientRect();
          const a = this.$refs.toc.querySelector(`a[href='${id}']`);

          a.classList.add('active');
          last = a;
          window.scrollTo(elRect.left - docRect.left, elRect.top - docRect.top);
        });
      }
    }
  }
};
</script>


<style src="~/styles/markdown.styl" lang="stylus"></style>
<style lang="stylus" scoped>
.main
  min-height 100vh
  background-color #f9f9f9

.sidebar
  color #0d2b3e
  position fixed
  width 33vw
  height 100vh

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
      padding 36px 10px
      max-height calc(100vh - 120px)
      overflow-y auto

    .back2top
      border-top 1px solid #f0f0f0
      display block
      text-decoration none
      color inherit
      margin-right 10px
      padding-top 36px

.article
  margin-left 33vw
  background-color #fff
  box-shadow -10px -8px 12px 0 rgba(0, 23, 40, 0.08)
  min-height 100vh

  .body:not(.__nuxt-error-page)
    max-width 700px
    padding 30px 0
    margin-left 50px
    box-sizing content-box

  .navbar
    padding 20px 0
    max-width 750px
    border-bottom 1px solid #78869c14
    text-align right

    .search-wrap
      flex auto

    ul
      display flex
      list-style none
      display inline-block

      li
        display inherit
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

    .body:not(.__nuxt-error-page)
      padding 20px
      margin-left 0

    .navbar
      text-align left

    .navbar ul li:last-child
      padding-right 20px
</style>
