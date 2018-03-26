<template>
  <div :style="{width: width}">
    <button @click="width = '300px'">change</button>

    <!-- <la-artboard narrow :width="750" :height="300" :data="data">
      <la-bar prop="pv"></la-bar>
      <la-bar prop="amt"></la-bar>
      <la-bar prop="uv"></la-bar>
      <la-x-axis prop="name"></la-x-axis>
      <la-y-axis></la-y-axis>
    </la-artboard> -->

    <la-artboard :data="data">
      <!-- <la-pie animated prop="pv"></la-pie> -->
      <!-- <la-line animated show-value prop="uv"></la-line> -->
      <!-- <la-line label="fuck" dot :width="2"></la-line> -->
      <la-line dot label="haha" :width="2" prop="pv"></la-line>

      <!-- <la-bar prop="uv"></la-bar> -->
      <la-x-axis prop="name"></la-x-axis>
      <la-y-axis></la-y-axis>
      <la-tooltip></la-tooltip>
      <la-legend></la-legend>
      <la-y-marker dashed placement="end" :value="200" label="2333"></la-y-marker>
      <la-y-region placement="middle" :low="150" :high="300" fill="rgba(0,0,0,0.1)" label="2333"></la-y-region>
    </la-artboard>
  </div>
</template>

<script>
export default {
  layout: 'home',

  data: () => {
    return {
      prop: 'pv',
      space: 80,
      show: false,
      showAxes: false,
      data: [{ pv: 100 }, { pv: 200 }, {}, { pv: 300 }, { pv: 400 }],
      width: null
    };
  },

  mounted() {
    setInterval(() => {
      // this.data.push(this.data.shift());
      // this.data[0].pv += 1000
    }, 1000);
  }
};
</script>

