<template>
  <div>
    <button @click="prop = prop === 'pv' ? 'amt' : 'pv'">change</button>
    <la-artboard :width="750" :height="300" :data="data" :padding="20">
      <!-- <la-line animated dot color="#5CC0C0" :prop="prop">
        <circle slot-scope="props" :cx="props.x" :cy="props.y" r="4"></circle>
      </la-line> -->

      <la-area animated curve dot prop="amt"></la-area>

    </la-artboard>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      prop: 'pv',
      data: [
        { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
        { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
        { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
        { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
        { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
        { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
        { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 }
      ]
    };
  }
};
</script>

<style>

</style>
