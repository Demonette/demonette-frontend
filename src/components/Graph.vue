<template>
  <div>
    <b-field label="Profondeur" ref="network">
      <b-select v-model="range">
        <option selected value="0">1</option>
        <option value="1">2</option>
        <option value="2">3</option>
        <option value="3">4</option>
        <option value="4">5</option>
      </b-select>
    </b-field>
    <b-notification :closable="false">
      <b-loading :active.sync="isLoading"></b-loading>
      <d3-network :net-nodes="nodes" :net-links="links" :options="options"/>
    </b-notification>
  </div>
</template>

<script>
import BNotification from 'buefy/src/components/notification/Notification';
import D3Network from 'vue-d3-network';
import graphRequest from '../methods/graphRequest';

export default {
  name: 'graph',
  components: {
    BNotification,
    D3Network,
  },
  props: ['element', 'selected'],
  data() {
    return {
      nodes: [
        { id: 1, name: this.element.graph_2, _color: '#6600cc' },
        { id: 2, name: this.element.graph_1, _color: '#6600cc' },
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
      range: 0,
      isLoading: false,
      isFullPage: false,
    };
  },
  watch: {
    selected() {
      if (this.selected) {
        this.networkBuilding();
      }
    },
    range() {
      this.isLoading = true;
      this.networkBuilding();
    },
  },
  methods: {
    networkBuilding() {
      graphRequest([this.element.graph_2, this.element.graph_1], 0, this.range)
        .then((el) => {
          this.nodes = el.data.nodes;
          this.links = el.data.links;
        }).then(() => { this.isLoading = false; });
    },
  },
};
</script>
<style scoped>
  .container {
    width: 100%;
    height: 100%;
  }
</style>
