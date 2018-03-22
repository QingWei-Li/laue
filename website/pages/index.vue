<template>
  <div>
    <button @click="show = !show">change</button>

    <!-- <la-artboard narrow :width="750" :height="300" :data="data">
      <la-bar prop="pv"></la-bar>
      <la-bar prop="amt"></la-bar>
      <la-bar prop="uv"></la-bar>
      <la-x-axis prop="name"></la-x-axis>
      <la-y-axis></la-y-axis>
    </la-artboard> -->

    <la-artboard style="margin: auto;" :width="750" :height="300" :data="data">
      <!-- <la-pie animated prop="pv"></la-pie> -->
      <!-- <la-line animated show-value prop="uv"></la-line> -->
      <la-line dot :width="2" prop="amt"></la-line>
      <la-line dot :width="2" prop="pv"></la-line>

      <!-- <la-bar prop="uv"></la-bar> -->
      <la-x-axis prop="name"></la-x-axis>
      <la-y-axis></la-y-axis>
      <la-tooltip></la-tooltip>
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
      data: [
        { name: 'Page A', uv: 4000, pv: 1000, amt: 2400 },
        { name: 'Page B', uv: 3000, pv: 1368, amt: 2210 },
        { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
        { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
        { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
        { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
        { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 }
      ]
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

