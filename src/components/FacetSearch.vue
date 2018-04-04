<template>
  <aside class="menu">
    <ul class="menu-list" v-for="(v, k) in facetFilter"
        v-if="facetFilter[`count-${k}`] !== 0 && !(k.includes('count-'))" v-bind:key="k">
        <facet-elements
          :queryField="queryField"
          :typeField="typeField"
          :facetFilter="facetFilter"
          :facetValue="v"
          :facetKey="k"/>
    </ul>
  </aside>
</template>

<script>
import FacetElements from './FacetElements';

export default {
  components: {
    FacetElements,
  },
  name: 'facet-search',
  props: ['facetFilter', 'queryField', 'typeField'],
  methods: {
    addTag(k, el) {
      if (!this.queryField.includes(el)) {
        this.queryField.push(el);
        this.typeField.push(k);
      } else {
        this.queryField.splice(this.queryField.indexOf(el), 1);
        this.typeField.splice(this.queryField.indexOf(el), 1);
      }
    },
    getSource(value) {
      // eslint-disable-next-line no-underscore-dangle
      return Object.values(value.dedup_docs.hits.hits[0]._source)[0];
    },
  },
};
</script>
