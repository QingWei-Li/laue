<template>
  <la-artboard narrow :bound="[0]" :data="values">
    <la-bar label="pv" prop="pv"></la-bar>
    <la-line label="uv" prop="uv"></la-line>
    <la-area label="amt" prop="amt"></la-area>

    <la-x-axis gridline dashed prop="name"></la-x-axis>
    <la-y-axis gridline dashed></la-y-axis>
    <la-tooltip></la-tooltip>
    <la-legend selectable></la-legend>
    <la-y-marker dashed :value="4000" label="marker"></la-y-marker>
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
};
</script>
