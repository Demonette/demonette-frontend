<template>
  <svg width="500" height="300"></svg>
</template>

<script>
const d3 = require('d3');

export default {
  props: ['element'],
  mounted() {
    d3.select(this.$el)
      .append('circle')
      .attr('cx', '100')
      .attr('cy', '100')
      .attr('r', '50');
  },
};
</script>
