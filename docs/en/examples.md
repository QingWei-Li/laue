<script>
export default {
  data: () => ({
    values: [
      { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
      { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
      { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
      { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
      { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
      { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
      { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 }
    ]
  })
}
</script>

# Line chart

## Simple line chart

<la-artboard :data="values">
  <la-line prop="pv"></la-line>
</la-artboard>

## With X and Y axis

<la-artboard :width="600" :height="200" :data="values">
  <la-line prop="pv"></la-line>
  <la-x-axis prop="name"></la-x-axis>
  <la-y-axis></la-y-axis>
</la-artboard>

## Custom domain

<la-artboard :domain="[0, n => n + 1000]" :width="600" :height="200" :data="values">
  <la-line prop="pv"></la-line>
  <la-x-axis prop="name"></la-x-axis>
  <la-y-axis></la-y-axis>
</la-artboard>

## Smooth line

<la-artboard :domain="[0, n => n + 1000]" :width="600" :height="200" :data="values">
  <la-line curve prop="pv"></la-line>
  <la-x-axis prop="name"></la-x-axis>
  <la-y-axis></la-y-axis>
</la-artboard>

## Mutiple lines

<la-artboard :domain="[0, n => n + 1000]" :width="600" :height="200" :data="values">
  <la-line curve prop="pv"></la-line>
  <la-line curve prop="amt"></la-line>
  <la-line curve prop="uv"></la-line>
  <la-x-axis prop="name"></la-x-axis>
  <la-y-axis></la-y-axis>
</la-artboard>

## Animated

<la-artboard :domain="[0, n => n + 1000]" :width="600" :height="200" :data="values">
  <la-line animated curve prop="pv"></la-line>
  <la-line animated curve prop="amt"></la-line>
  <la-line animated curve prop="uv"></la-line>
  <la-x-axis prop="name"></la-x-axis>
  <la-y-axis></la-y-axis>
</la-artboard>

## Stacked

<la-artboard stacked :domain="[0, n => n + 1000]" :width="600" :height="200" :data="values">
  <la-line prop="uv"></la-line>
  <la-line prop="amt"></la-line>
  <la-line prop="pv"></la-line>
  <la-x-axis prop="name"></la-x-axis>
  <la-y-axis></la-y-axis>
</la-artboard>

## Areas

<la-artboard stacked :domain="[0, n => n + 1000]" :width="600" :height="200" :data="values">
  <la-area prop="uv"></la-area>
  <la-area prop="amt"></la-area>
  <la-area prop="pv"></la-area>
  <la-x-axis prop="name"></la-x-axis>
  <la-y-axis></la-y-axis>
</la-artboard>

## Mix

<la-artboard stacked :domain="[0, n => n + 1000]" :width="600" :height="200" :data="values">
  <la-area prop="uv"></la-area>
  <la-area prop="amt"></la-area>
  <la-line prop="pv"></la-line>
  <la-x-axis prop="name"></la-x-axis>
  <la-y-axis></la-y-axis>
</la-artboard>

```html live
<la-artboard :data="values">
  <la-line prop="pv"></la-line>
</la-artboard>

<script>
export default {
  data: () => ({
    values: [
      { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
      { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
      { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
      { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
      { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
      { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
      { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 }
    ]
  })
}
</script>
```
