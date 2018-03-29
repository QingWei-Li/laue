<template>
  <div>
    <la-cartesian :width="300" :height="75" :data="values">
      <la-line animated v-if="show === 'line'" prop="value"></la-line>
      <la-area animated v-else-if="show === 'area'" prop="value"></la-area>
      <la-bar animated v-else prop="value"></la-bar>
    </la-cartesian>

    <label>Choose type:</label>
    <button @click="show = 'line'">line</button>
    <button @click="show = 'area'">area</button>
    <button @click="show = 'bar'">bar</button>
  </div>
</template>

<script>
export default {
  data: () => ({
    show: 'line',
    values: [
      { value: 3200 },
      { value: 2600 },
      { value: 4500 },
      { value: 3040 },
      { value: 6900 },
      { value: 4910 },
      { value: 2300 }
    ]
  })
};
</script>
