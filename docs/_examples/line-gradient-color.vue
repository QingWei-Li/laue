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
};
</script>
