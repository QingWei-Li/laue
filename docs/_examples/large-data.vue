<template>
  <la-cartesian :data="values">
    <la-line :width="2" prop="value"></la-line>
    <la-x-axis :interval="i => i === 0 || i === values.length - 1 || i % 50 === 0"></la-x-axis>
    <la-y-axis :interval="100" :format="v => Math.round(v)"></la-y-axis>
  </la-cartesian>
</template>

<script>
export default {
  data() {
    const data = {
      values: []
    }
    let lastValue = 0
    for (let i = 0; i < 500; i++) {
      lastValue += Math.random() * 10 - 5

      data.values.push({
        value: lastValue
      })
    }
    return data
  }
}
</script>
