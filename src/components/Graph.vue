<template>
  <div>
    <d3-network :net-nodes="nodes" :net-links="links" :options="options"/>
  </div>
</template>

<script>
import D3Network from 'vue-d3-network';
import networkBuilding from '../methods/networkBuilding';

export default {
  name: 'graph',
  components: {
    D3Network,
  },
  props: ['element'],
  data() {
    return {
      nodes: [
        { id: 1, name: this.element.graphie_2, _color: '#6600cc' },
        { id: 2, name: this.element.graphie_1, _color: '#6600cc' },
      ],
      links: [
        { sid: 1, tid: 2, _color: '#6600cc' },
        { sid: 2, tid: 1, _color: '#6600cc' },
      ],
      options: {
        force: 3000,
        nodeSize: 20,
        nodeLabels: true,
        linkWidth: 1.5,
        size: {
          h: window.innerHeight / 2.5,
          w: window.innerWidth / 1.4,
        },
      },
    };
  },
  mounted() {
    const graph = networkBuilding([this.element.graphie_2, this.element.graphie_1], 0, 3);
    this.nodes = graph.nodes;
    this.links = graph.links;
  },
};
</script>
<style scoped>
  .container {
    width: 100%;
    height: 100%;
  }
</style>
