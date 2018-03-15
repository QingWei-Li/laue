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

## Tiny line

Only one line, like trending for GitHub.

<la-artboard :data="values">
  <la-line prop="pv"></la-line>
</la-artboard>

## Simple line chart

An example of a simple line chart with three series.

<la-artboard :width="600" :height="200" :data="values">
  <la-line prop="pv"></la-line>
  <la-line prop="uv"></la-line>
  <la-line prop="amt"></la-line>
  <la-x-axis prop="name"></la-x-axis>
  <la-y-axis></la-y-axis>
</la-artboard>

## Line gradient

## Line chart With area

This chart uses [Area](api#area) component to draw an area shape. Use the [domain](api#domain) to specify the lower bound.

<la-artboard :domain="[0, null]" :width="600" :height="200" :data="values">
  <la-area dot curve prop="pv"></la-area>
  <la-x-axis></la-x-axis>
  <la-y-axis></la-y-axis>
</la-artboard>

# Bar chart

## Tiny bar

## Simple bar chart
