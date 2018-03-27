# Line chart

## Tiny line

Only one line, like trending for GitHub.

```html (vue)
<template>
  <la-artboard :width="300" :height="75" :data="values">
    <la-line prop="value"></la-line>
  </la-artboard>
</template>

<script>
export default {
  data: () => ({
    values: [
      { value: 3200 },
      { value: 2600 },
      { value: 4500 },
      { value: 3040 },
      { value: 6900 },
      { value: 4910 },
      { value: 2300 }
    ]
  })
}
</script>
```

## Simple line chart

An example of a simple line chart with three smooth series.

```html (vue)
<template>
  <la-artboard :bound="[0, n => n + 1000]" :data="values">
    <la-line dot curve prop="pv"></la-line>
    <la-line dot curve prop="uv"></la-line>
    <la-line dot curve prop="amt"></la-line>
    <la-x-axis prop="name"></la-x-axis>
    <la-y-axis></la-y-axis>
    <la-tooltip></la-tooltip>
  </la-artboard>
</template>

<script>
export default {
  data: () => ({
    values: [
      { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
      { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
      { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
      { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
      { name: 'Page E', uv: 1890, pv: 4800, amt: 1700 },
      { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
      { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 }
    ]
  })
}
</script>
```

## Line gradient color

Custom gradient color, similar to [vue-trend](https://cinwell.com/vue-trend/).

```html (vue)
<template>
  <la-artboard :data="values">
    <defs>
      <linearGradient id="color-id" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#2c3e50"></stop>
        <stop offset="0.5" stop-color="#42b983"></stop>
        <stop offset="1" stop-color="#6fa8dc"></stop>
      </linearGradient>
    </defs>
    <la-line curve :width="2" prop="value" color="url(#color-id)"></la-line>
    <la-x-axis></la-x-axis>
    <la-y-axis></la-y-axis>
  </la-artboard>
</template>

<script>
export default {
  data: () => ({
    values: [
      { value: -2 },
      { value: 2 },
      { value: 5 },
      { value: 9 },
      { value: 5 },
      { value: 10 },
      { value: 3 },
      { value: 5 },
      { value: 0 },
      { value: 1 },
      { value: 8 },
      { value: 2 },
      { value: 9 },
      { value: 0 }
    ]
  })
}
</script>
```

## Line chart with area

This chart uses [Area](api#area) component to draw an area shape. Use the `bound` to specify the lower bound.

```html (vue)
<template>
  <la-artboard :bound="[0]" :data="values">
    <la-area dot curve prop="pv"></la-area>
    <la-x-axis prop="name"></la-x-axis>
    <la-y-axis></la-y-axis>
  </la-artboard>
</template>

<script>
export default {
  data: () => ({
    values: [
      { name: 'Page A', pv: 2400 },
      { name: 'Page B', pv: 1398 },
      { name: 'Page C', pv: 9800 },
      { name: 'Page D', pv: 3908 },
      { name: 'Page E', pv: 4800 },
      { name: 'Page F', pv: 3800 },
      { name: 'Page G', pv: 4300 }
    ]
  })
}
</script>
```

# Bar chart

## Tiny bar

```html (vue)
<template>
  <la-artboard :width="300" :height="75" :data="values">
    <la-bar prop="value"></la-bar>
  </la-artboard>
</template>

<script>
export default {
  data: () => ({
    values: [
      { value: 3200 },
      { value: 2600 },
      { value: 4500 },
      { value: 3040 },
      { value: 6900 },
      { value: 4910 },
      { value: 2300 }
    ]
  })
}
</script>
```
