<template>
  <la-artboard :bound="[0]" :data="values">
    <la-line dot :curve="curveStep" prop="pv"></la-line>
    <la-x-axis prop="name"></la-x-axis>
    <la-y-axis></la-y-axis>
  </la-artboard>
</template>

<script>
import { curveStep } from 'd3-shape';

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
    ],
    curveStep: curveStep
  })
};
</script>
