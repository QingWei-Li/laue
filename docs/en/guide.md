# Why Laue?

Before I developed a simple line chart component for Vue.js([vue-trend](//cinwell.com/vue-trend)). Unexpectedly, it is very popular. It's lightweight, simple, but not powerful. I want to extend it and add more charts. It is different and other charts.

* It depends on several small submodules in [D3](//d3js.org), so it's very **reliable** and **lightweight**.
* The implementation for Vue.js, so it is **composable** and **supports SSR**.

# Installation

## npm or Yarn

Installing with npm(or Yarn) is recommended.

```sh
npm i laue
# yarn add laue
```

## CDN

Get the latest version from [unpkg.com/laue](//unpkg.com/laue).

```html
<script src=//unpkg.com/laue></script>
```

# Register Laue

## Fully register

This is the easiest way to register Laue, then you can use all components of Laue anywhere.

```js
import Vue from 'vue';
import { Laue } from 'laue';

Vue.use(Laue);
```

## On demand

This is recommended way to register the components you need. If you build tool supports [tree shaking](//medium.com/@Rich_Harris/tree-shaking-versus-dead-code-elimination-d3765df85c80#.jnypozs9n)(such as [rollup](//rollupjs.org) and [webpack>=2](//webpack.js.org)), components that you did not use will be removed at build time.

```html
<template>
  <la-artboard :data="values">
    <la-line prop="value"></la-line>
  </la-artboard>
<template>

<script>
import { Artboard, Line } from 'laue'

export default {
  components: {
    LaArtboard: Artboard,
    LaLine: Line
  },

  data: () => ({
    values: [
      { value: 10 },
      { value: 20 },
      { value: 30 },
      { value: 20 }
    ]
  })
}
</script>
```

# Quick started

A simple example guides you to use Laue.

## Step 1. Place the artboard and bind the data

```html
<template>
  <la-artboard :width="600" :height="300" :data="values">
  </la-artboard>
</template>

<script>
export default {
  data: () => ({
    values: [
      { name: 'Page A', pv: 2000 },
      { name: 'Page B', pv: 3000 },
      { name: 'Page C', pv: 1200 }
    ]
  })
}
</script>
```

## Step 2. Add chart

```html
<la-artboard :width="300" :height="150" :data="values">
  <la-line prop="pv"></la-line>
</la-artboard>
```

## Step 3. Add other plugins

```html
<la-artboard :width="300" :height="150" :data="values">
  <la-line prop="pv"></la-line>
  <la-y-axis></la-y-axis>
  <la-x-axis prop="name"></la-x-axis>
  <la-tooltip></la-tooltip>
</la-artboard>
```

## Done!

You can check [/examples](/examples) for more examples.

```html (vue)
<template>
  <la-artboard :width="300" :height="150" :data="values">
    <la-line prop="pv"></la-line>
    <la-y-axis></la-y-axis>
    <la-x-axis prop="name"></la-x-axis>
    <la-tooltip></la-tooltip>
  </la-artboard>
</template>

<script>
export default {
  data: () => ({
    values: [
      { name: 'Page A', pv: 2000 },
      { name: 'Page B', pv: 3000 },
      { name: 'Page C', pv: 1200 }
    ]
  })
}
</script>
```

# Development

```sh
git clone https://github.com/qingwei-li/laue.git
cd laue
npm i
npm run dev
```
