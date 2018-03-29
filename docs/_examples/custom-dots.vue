<template>
  <la-cartesian narrow :bound="[0, n => n + 1000]" :data="values">
    <la-line prop="pv">
      <g
        slot-scope="props"
        :fill="props.color">
        <rect
          :x="props.x - 5"
          :y="props.y - 5"
          width="10"
          height="10">
        </rect>
        <text
          :x="props.x"
          :y="props.y"
          text-anchor='middle'
          dy="-.5em">
          {{ props.value }}
        </text>
      </g>
    </la-line>
    <la-x-axis prop="name"></la-x-axis>
    <la-y-axis></la-y-axis>
  </la-cartesian>
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
};
</script>
