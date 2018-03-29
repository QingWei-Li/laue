<template>
  <la-cartesian :width="300" :height="150" :data="values">
    <la-line prop="pv"></la-line>
    <la-y-axis></la-y-axis>
    <la-x-axis prop="name"></la-x-axis>
    <la-tooltip></la-tooltip>
  </la-cartesian>
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
};
</script>
