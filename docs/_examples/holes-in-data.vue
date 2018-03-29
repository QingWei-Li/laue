<template>
  <div>
    <la-cartesian :data="values">
      <la-area :continued="continued" dot curve prop="pv"></la-area>
      <la-x-axis></la-x-axis>
      <la-y-axis></la-y-axis>
    </la-cartesian>

    <button @click="continued = !continued">Toggle continued</button>
  </div>
</template>

<script>
export default {
  data: () => ({
    continued: false,
    values: [
      { pv: 2400 },
      { pv: 1398 },
      { pv: 9800 },
      { pv: null },
      { pv: 4800 },
      { pv: 3800 },
      { pv: null },
      { pv: 3000 },
      { pv: 2000 }
    ]
  })
};
</script>
