<template>
  <la-cartesian :bound="[-2, 12]" :data="values">
    <la-line :width="2" prop="value"></la-line>
    <la-x-axis :interval="i => i === 0 || i === values.length - 1 || i % 10 === 0"></la-x-axis>
    <la-y-axis :interval="20" :format="v => Math.round(v)"></la-y-axis>
  </la-cartesian>
</template>

<script>
export default {
  data() {
    const data = {
      values: []
    }
    for (let i = 0; i < 100; i++) {
      data.values.push({
        value: Math.round(Math.random() * 10)
      })
    }
    return data
  }
}
</script>
