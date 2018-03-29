<template>
  <la-artboard :data="values">
    <la-line dot label="pv" prop="pv"></la-line>
    <la-line dot label="amt" prop="amt"></la-line>
    <la-line dot label="uv" prop="uv"></la-line>
    <la-x-axis prop="name"></la-x-axis>
    <la-y-axis></la-y-axis>
    <la-tooltip>
      <div class="tooltip" slot-scope="props">
        <div class="title">{{ props.label }}</div>
        <ul class="list">
          <li
            :key="item.label"
            v-for="item in props.actived"
            :style="{ borderTop: '3px solid ' + item.color }">
            <div class="label">{{ item.label }}</div>
            <div class="value">{{ item.value }}</div>
          </li>
        </ul>
      </div>
    </la-tooltip>
  </la-artboard>
</template>

<style scoped>
.tooltip {
  background: rgba(0, 0, 0, 0.8);
  border-radius: 4px;
}

.title {
  padding: 10px;
  color: #959da5;
}

.list {
  list-style: none;
  display: flex;
}

.list li {
  padding: 5px 10px;
  flex: 1;
  color: #fff;
  margin: 0;
  min-width: 90px;
}

.list li::before {
  content: none;
}

.label {
  color: #dfe2e5;
  font-weight: 600;
}

.value {
  color: #959da5;
}
</style>

<script>
export default {
  data: () => ({
    values: [
      { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
      { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
      { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
      { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
      { name: 'Page E', uv: 1890, pv: 4800, amt: 1700 },
      { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
      { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 }
    ]
  })
};
</script>
