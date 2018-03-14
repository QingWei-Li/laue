<template>
  <main class="main">
    <aside class="sidebar">
      <nav class="nav">123</nav>
    </aside>
    <article class="article">
      <nuxt class="body"></nuxt>
    </article>
  </main>
</template>

<style src="~/styles/markdown.css"></style>
<style lang="stylus" scoped>
.main
  display flex
  min-height 100vh
  background linear-gradient(90deg, #f9fafb 60%, #fff 61%)

.sidebar
  width 40%

  .nav
    width 220px
    float right
    padding 70px 10px

.article
  flex 1
  background-color #fff
  box-shadow -10px -8px 12px 0 rgba(0, 23, 40, 0.08)

  .body
    width 600px
    padding 70px 100px
    box-sizing content-box
</style>


