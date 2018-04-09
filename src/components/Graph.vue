<template>
  <div>
    <d3-network :net-nodes="nodes" :net-links="links" :options="options"/>
  </div>
</template>

<script>
import D3Network from 'vue-d3-network';

export default {
  name: 'graph',
  components: {
    D3Network,
  },
  props: ['element'],
  data() {
    return {
      nodes: [
        { id: 1, name: this.element.graphie_2 },
        { id: 2, name: this.element.graphie_1 },
      ],
      links: [
        { sid: 1, tid: 2, _color: 'red' },
      ],
      options: {
        force: 3000,
        nodeSize: 20,
        nodeLabels: true,
        linkWidth: 1,
        size: {
          h: window.innerHeight / 2.5,
          w: window.innerWidth / 1.4,
        },
      },
    };
  },
};
</script>
<style scoped>
  .container {
    width: 100%;
    height: 100%;
  }
</style>
