<template>
  <la-artboard :bound="[0]" :data="values">
    <defs>
      <linearGradient id="area-fill" x1="0" y1="0" x2="0" y2="1">
        <stop stop-color="#0076b1" offset="0%" stop-opacity="0.4"></stop>
        <stop stop-color="#0076b1" offset="50%" stop-opacity="0.2"></stop>
        <stop stop-color="#0076b1" offset="100%" stop-opacity="0"></stop>
      </linearGradient>
    </defs>
    <la-area fill-color="url(#area-fill)" dot curve prop="pv"></la-area>
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
};
</script>
