<template>
  <la-cartesian :bound="[0, 5]" :data="values">
    <la-line :width="2" prop="value"></la-line>
    <la-x-axis></la-x-axis>
    <la-y-axis :ticks="ticks"></la-y-axis>
  </la-cartesian>
</template>

<script>
export default {
  data() {
    const data = {
      values: [],
      ticks: [0, 1, 2, 3, 4, 5]
    }
    for (let i = 0; i < 10; i++) {
      data.values.push({
        value: Math.floor(Math.random() * Math.floor(5))
      })
    }
    return data
  }
}
</script>
