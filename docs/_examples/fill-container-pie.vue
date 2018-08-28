<template>
  <div>
    <p>
      <code>fillContainer</code> prop allows to make pie fill it's container instead of being simply centered with fixed size:<br /><br />
    </p>
    <la-polar :data="values" fillContainer :width="500">
      <la-pie show-value prop="pv"></la-pie>
    </la-polar>
  </div>
</template>

<script>
export default {
  data: () => ({
    values: [
      { name: 'Page A', pv: 2400 },
      { name: 'Page B', pv: 1398 },
      { name: 'Page C', pv: 9800 },
      { name: 'Page D', pv: 3908 },
      { name: 'Page E', pv: 4800 },
      { name: 'Page F', pv: 3800 },
      { name: 'Page G', pv: 4300 }
    ]
  })
};
</script>
