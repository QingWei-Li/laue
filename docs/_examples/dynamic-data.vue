<template>
  <la-cartesian :bound="[n => n - 10, n => n + 10]" :data="values">
    <la-line :width="2" dashed dot animated curve prop="value"></la-line>

    <la-x-axis></la-x-axis>
    <la-y-axis></la-y-axis>
  </la-cartesian>
</template>

<script>
export default {
  data: () => ({
    values: []
  }),

  methods: {
    genNewData() {
      return Math.floor(Math.random() * 100);
    }
  },

  mounted() {
    for (let i = 0; i < 10; i++) {
      this.values.push({
        value: this.genNewData()
      });
    }
    setInterval(() => {
      this.values.shift();
      this.values.push({
        value: this.genNewData()
      });
    }, 1000);
  }
};
</script>
