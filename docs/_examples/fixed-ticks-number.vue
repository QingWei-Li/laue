<template>
  <div>
    <p>
      Sometimes you just want to show a fixed number of Y axis ticks:
    </p>

    <la-cartesian :bound="[0, 5]" :data="values">
      <la-line :width="2" prop="value"></la-line>
      <la-x-axis></la-x-axis>
      <la-y-axis :nbTicks="3"></la-y-axis>
    </la-cartesian>
  </div>
</template>

<script>
export default {
  data() {
    const data = {
      values: []
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
